from rest_framework.response import Response
from rest_framework.views import APIView
from google_api.scraper1 import scraper

class GoogleView(APIView):
    def post(self, request, *args, **kwargs):
        posted_data = self.request.data
        print(posted_data)
        searchterm = posted_data['searchterm']
        background = scraper(searchterm + " " + "background")
        links = scraper(searchterm)
        # return Response(status=200, data=return_data)
        return Response({"links": links ,"background": background[0]})

    def get(self, request, *args, **kwargs):
        links = scraper("beautiful women")
        return Response({"links": links })
