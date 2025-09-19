import boto3
import os
from typing import Dict, Any
from botocore.exceptions import ClientError
from utils.logger import logger
from datetime import datetime

class SESEmailService:

    def __init__(self):
        self.ses_client = None
        self.sender_email = os.getenv('DEFAULT_FROM_EMAIL')
        self.region = os.getenv('AWS_SES_REGION', 'us-east-1')
        self._init_ses_client()
    
    def _init_ses_client(self):
        try:
            self.ses_client = boto3.client(
                'ses',
                aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
                region_name=self.region
            )
        except Exception as e:
            logger.error(f"Failed to initialize SES client: {str(e)}")
            raise e
        
    def send_quote_email(self, quote_data: Dict[str, Any]):
        try:
            recipient = os.getenv("TO_EMAIL_ADDRESS")
            if not recipient:
                logger.error("TO_EMAIL_ADDRESS is not set")
                return False
            
            # handle sending email
            response = self.ses_client.send_email(
                Source=self.sender_email,
                Destination={
                    'ToAddresses': [recipient]
                },
                Message={
                    'Subject': {
                        'Data': f'RPP Quote Request - {quote_data["first_name"]} {quote_data["last_name"]}'
                    },
                    'Body': {
                        'Text': {
                            'Data': self._generate_email_body(quote_data)
                        }
                    }
                }
            )

            # check if the email was sent successfully
            if response['ResponseMetadata']['HTTPStatusCode'] != 200:
                logger.error(f"Failed to send quote email: {response}")
                return False
            return True

        except ClientError as e:
            logger.error(f"AWS SES error: {e}")
            return False
        except Exception as e:
            logger.error(f"Failed to send quote email: {str(e)}")
            return False
    
    def _get_service_display_name(self, service_name):
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

    def _generate_email_body(self, data):
        # Format services with enhanced spacing and clear bullets
        services_list = '\n\n'.join(f'  • {self._get_service_display_name(service)}' for service in data["services"])
        
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

email_service = SESEmailService()