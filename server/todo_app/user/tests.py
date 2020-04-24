from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework import status

class AccountsTest(APITestCase):
    def setUp(self):
        self.test_user = User.objects.create_user('testUser','test#example.com',' testpassword')
        self.create_url = reverse('user_view_url')

    def test_create_user(self):
        data = {
            'username':'foobar',
            'email':'foobar@example.com',
            'passwords':'somepassword'
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(User.objects.count(),2)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['username'], data['username'])
        self.assertEqual(response.data['email'], data['email'])
        self.assertEqual('password' in response.data)

# Create your tests here.
