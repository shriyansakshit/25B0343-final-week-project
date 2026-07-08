import datetime

WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


def weekday_name_for_date(date_obj):
    return WEEKDAY_NAMES[date_obj.weekday()]


def parse_time_12h(text):
    """'9:00 AM' -> datetime.time(9, 0)"""
    return datetime.datetime.strptime(text.strip(), '%I:%M %p').time()


def parse_range(range_text):
    """'9:00 AM - 1:00 PM' -> (time, time), or None if unset/unparseable."""
    if not range_text:
        return None
    for sep in ['-', '–']:
        if sep in range_text:
            start_str, end_str = range_text.split(sep, 1)
            try:
                return parse_time_12h(start_str), parse_time_12h(end_str)
            except ValueError:
                return None
    return None


def generate_slots(start_time, end_time, duration_minutes=30):
    """Returns a list of 'HH:MM' (24h) slot strings between start and end."""
    slots = []
    anchor = datetime.date.today()
    current = datetime.datetime.combine(anchor, start_time)
    end_dt = datetime.datetime.combine(anchor, end_time)
    while current < end_dt:
        slots.append(current.strftime('%H:%M'))
        current += datetime.timedelta(minutes=duration_minutes)
    return slots


def slots_for_doctor_on_date(doctor, date_obj, availability_log_model, appointment_model):
    """
    Full slot computation for a doctor on a given date:
    - an 'unavailable' log entry for that date wipes all slots
    - normal weekly hours generate the base slots
    - an 'available' log entry adds a fixed extra evening block
    - already-booked times are removed
    """
    unavailable = availability_log_model.objects.filter(
        doctor=doctor, date=date_obj, status='unavailable', reverted=False
    ).exists()
    if unavailable:
        return []

    slots = []
    weekday = weekday_name_for_date(date_obj)
    range_text = (doctor.weekly_hours or {}).get(weekday)
    parsed = parse_range(range_text)
    if parsed:
        slots += generate_slots(*parsed)

    has_extra = availability_log_model.objects.filter(
        doctor=doctor, date=date_obj, status='available', reverted=False
    ).exists()
    if has_extra:
        slots += generate_slots(datetime.time(18, 0), datetime.time(20, 0))

    booked = set(
        appointment_model.objects.filter(
            doctor=doctor, date=date_obj, status='confirmed'
        ).values_list('time', flat=True)
    )
    open_slots = [s for s in sorted(set(slots)) if s not in booked]

    if date_obj == datetime.date.today():
        now_str = datetime.datetime.now().strftime('%H:%M')
        open_slots = [s for s in open_slots if s > now_str]

    return open_slots
