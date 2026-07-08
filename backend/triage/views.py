from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TriageLog
from .serializers import TriageLogSerializer


class LogTriageView(APIView):
    # Public: the symptom checker is usable before logging in.
    permission_classes = [AllowAny]

    def post(self, request):
        log = TriageLog.objects.create(
            patient=request.user if request.user.is_authenticated else None,
            body_area=request.data.get('bodyArea', ''),
            symptom=str(request.data.get('symptom', '')),
            department=request.data.get('department', ''),
        )
        return Response(TriageLogSerializer(log).data, status=201)
