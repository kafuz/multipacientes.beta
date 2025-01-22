def create__attr__null(obj, body, attr):
    data={}
    for key in attr:
        data[key]= body.get(key)

    for name in data:
        if data[name]!= '':
            setattr(obj, name, data[name]) 

def update__attr(obj, body, attr):
    data={}
    for key in attr:
        if(getattr(obj ,key)!=body.get(key)):
            setattr(obj, key, body.get(key))

def newJson(diccionario, lista_de_diccionarios):
    # Creamos una copia del diccionario inicial para evitar modificar el original
    resultado = diccionario.copy()

    # Iteramos sobre la lista de diccionarios y los añadimos al diccionario resultado
    for dic in lista_de_diccionarios:
        resultado.update(dic)
    
    return resultado


from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile

def compress_image(image):
    # Abrir la imagen usando Pillow
    img = Image.open(image)

    # Convertir la imagen a formato JPEG si no lo está
    if img.mode in ("RGBA", "P"):  # Si es PNG o tiene transparencia
        img = img.convert("RGB")

    # Crear un buffer en memoria para almacenar la imagen comprimida
    im_io = BytesIO()

    # Guardar la imagen en el buffer con calidad reducida (ej: 30)
    img.save(im_io, 'JPEG', quality=30)  # Puedes ajustar el nivel de calidad aquí

    # Convertir el buffer en un objeto InMemoryUploadedFile
    compressed_image = InMemoryUploadedFile(
        im_io,       # archivo en memoria
        'ImageField',  # nombre del campo
        image.name,  # nombre original del archivo
        'image/jpeg',  # MIME type
        im_io.tell(),  # tamaño del archivo
        None)  # Opciones adicionales

    return compressed_image