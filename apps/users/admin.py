from django.contrib import admin
from apps.users.models import User


class UserAdmin(admin.ModelAdmin):
    list_display = ('pk', 'name', 'last_name', 'email')


admin.site.register(User, UserAdmin)
