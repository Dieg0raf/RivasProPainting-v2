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
    # Format services with enhanced spacing and clear bullets
    services_list = '\n\n'.join(f'  • {get_service_display_name(service)}' for service in data["services"])
    
    # Get current timestamp in a more readable format
    timestamp = datetime.now().strftime('%B %d, %Y at %I:%M %p')
    
    email_template = f"""
        🔔  NEW QUOTE REQUEST / NUEVA SOLICITUD DE PRESUPUESTO


        👤  CLIENT INFORMATION / INFORMACIÓN DEL CLIENTE
        ------------------------------------------------

        Name / Nombre:     {data["first_name"]} {data["last_name"]}
        Email / Correo:    {data["email"]}
        Phone / Teléfono:  {data["phone"]}


        📋  REQUESTED SERVICES / SERVICIOS SOLICITADOS
        ------------------------------------------------

        {services_list}


        📝  PROJECT DETAILS / DETALLES DEL PROYECTO
        ------------------------------------------------

        {data["message"]}


        ⏰  Request Received / Solicitud Recibida
        ------------------------------------------------

        {timestamp}
    """

    return email_template