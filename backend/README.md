# Meridian General — Backend (Django + DRF)

## Setup

```bash
cd backend
python -m venv venv && source venv/bin/activate   # or your preferred env tool
pip install -r requirements.txt

cp .env.example .env
# Leave DATABASE_URL blank to use sqlite (zero setup), or point it at Postgres:
# DATABASE_URL=postgres://user:password@localhost:5432/meridian_general

python manage.py migrate
python manage.py seed_dean              # creates the single dean account
python manage.py seed_sample_doctors    # optional: 5 pre-verified doctors for demoing

python manage.py runserver
```

API is served at `http://localhost:8000/api/` — matches `VITE_API_URL` in the frontend's `.env`.

## Accounts

- **Dean:** username `dean`, password from `DEAN_PASSWORD` in `.env` (default `dean`). No signup — created only by `seed_dean`.
- **Doctors:** sign up with name + specialty. Password is always `DOCTOR_SHARED_PASSWORD` (default `doctor`) for every doctor account. New doctors start unverified and won't appear in `/api/doctors/` until a dean verifies them from the dashboard.
- **Patients:** sign up with name, phone, address, password — phone is their login identifier.

## Notes on the "8-hour build" shortcuts

- **Weekly hours** are stored as a plain JSON dict on the doctor's user row (e.g. `{"Mon": "9:00 AM - 1:00 PM"}`), parsed into slots on request rather than as a separate scheduling table. Fine for the assignment scope; would need real timezone handling for production use.
- **Emergency ambulance requests** don't dispatch anything real — they're logged and surfaced to the dean's queue, matching what the frontend describes as a simulated dispatch.
- **Availability changes** (`/doctor/availability/request/`) apply immediately and are logged for the dean to review/revert — there's no blocking approval step, by design (see `AvailabilityChangeLog`).

## Running tests manually

The admin site at `/admin/` is enabled and useful for poking at data directly — log in with the dean account (it's also given `is_staff`/`is_superuser`).
