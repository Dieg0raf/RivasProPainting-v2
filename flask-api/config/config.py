FIELD_LENGTHS = {
    'first_name': (1, 50),
    'last_name': (1, 50),
    'email': (1, 120),
    'phone': (1, 20),
    'message': (1, 2000),
    # 'services': (1, 20)
}
MAX_KEY_LENGTH = 50
INTERIOR_SERVICES = ('interior_painting', 'cabinet_painting', 'drywall', 'wallpaper', 'trim_painting', 'crown_molding')
EXTERIOR_SERVICES = ('exterior_painting', 'staining', 'stucco', 'siding', 'power_washing')
ALLOWED_SERVICES = INTERIOR_SERVICES + EXTERIOR_SERVICES