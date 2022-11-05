from drf_yasg import openapi


def parameter(name, description, type):
    header_param = openapi.Parameter(
        name=name,
        in_=openapi.IN_QUERY,
        description=description,
        type=type
    )
    return header_param
