from django.test import SimpleTestCase
from django.urls import reverse, resolve

from api.views import UserView

class testURLS(SimpleTestCase):

    def test_user_url_is_resolved(self):
        url = reverse('User')
        #print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, UserView)
