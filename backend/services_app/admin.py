from django.contrib import admin
from .models import ElectricalService, Expert

@admin.register(ElectricalService)
class ElectricalServiceAdmin(admin.ModelAdmin):
    list_display = ('service_name', 'category', 'price', 'rating', 'name_of_the_expert')
    list_filter = ('category', 'created_at')
    search_fields = ('service_name', 'description', 'name_of_the_expert')
    ordering = ('-created_at',)

@admin.register(Expert)
class ExpertAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'created_at')
    ordering = ('-created_at',)
