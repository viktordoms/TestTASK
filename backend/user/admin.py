from django.contrib import admin
from .models import User, Group


class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'user_name', 'create_date', 'group')
    list_display_links = ('id', 'user_name', 'create_date', 'group')
    search_fields = ('user_name', 'create_date', 'group')
    list_filter = ('id',)


class GroupAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description')
    list_display_links = ('id', 'name', 'description')
    search_fields = ('name', 'description')


admin.site.register(User, UserAdmin)
admin.site.register(Group, GroupAdmin)
