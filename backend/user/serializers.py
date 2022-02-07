from rest_framework import serializers


from .models import User, Group


class UserSerializer(serializers.ModelSerializer):
    create_date = serializers.DateField(read_only=True)
    group_name = serializers.ReadOnlyField(source='group.name')

    class Meta:
        model = User
        fields = '__all__'


class GroupSerializer(serializers.ModelSerializer):
    description = serializers.CharField(allow_blank=False, max_length=150, required=True, style={'base_template': 'textarea.html'})

    class Meta:
        model = Group
        fields = '__all__'
