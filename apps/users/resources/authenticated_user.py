def authenticated_user(request):
    current_user = request.user
    return current_user
