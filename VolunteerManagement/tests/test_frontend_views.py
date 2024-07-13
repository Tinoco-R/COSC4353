# Test for back-end-programmed front-end views
from django.test import TestCase, Client
from django.urls import reverse
from frontend import views

class testFrontendViews(TestCase):

    def test_frontend_view(self):
        client = Client()
        response = client.get(reverse('index'))

        self.assertEqual(response.status_code, 200)
