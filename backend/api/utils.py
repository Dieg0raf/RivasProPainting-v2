from datetime import datetime

def get_service_display_name(service_name):
    service_names = {
        'interior_painting': 'Interior Painting / Pintura Interior',
        'exterior_painting': 'Exterior Painting / Pintura Exterior',
        'cabinet_painting': 'Cabinet Painting / Pintura de Gabinetes',
        'drywall': 'Drywall & Plaster / Drywall y Yeso',
        'wallpaper': 'Wallpaper / Papel Tapiz',
        'trim_painting': 'Trim & Baseboards / Molduras y Zócalos',
        'crown_molding': 'Crown Molding / Molduras de Corona',
        'staining': 'Staining & Varnishing / Tintura y Barniz',
        'stucco': 'Stucco Repair / Reparación de Estuco',
        'siding': 'Siding Repair / Reparación de Revestimiento',
        'power_washing': 'Power Washing / Lavado a Presión'
    }
    return service_names.get(service_name, service_name)

def generate_email_body(data):
    # Format services into a bullet list
    services_list = '\n'.join(f'• {get_service_display_name(service)}' for service in data["services"])
    
    email_template = f"""
        NEW QUOTE REQUEST / NUEVA SOLICITUD DE PRESUPUESTO
        ------------------------------------------------

        Client Information / Información del Cliente:
        -------------------------------------------
        Name / Nombre: {data["first_name"]} {data["last_name"]}
        Email / Correo: {data["email"]}
        Phone / Teléfono: {data["phone"]}

        Requested Services / Servicios Solicitados:
        -----------------------------------------
        {services_list}

        Project Details / Detalles del Proyecto:
        --------------------------------------
        {data["message"]}

        Quote Received / Presupuesto Recibido: {datetime.now().strftime('%Y-%m-%d %H:%M')}
        """
    return email_template