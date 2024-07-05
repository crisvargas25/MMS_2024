import os
import requests
from colorama import Fore, Style, init

init(autoreset=True)

URLbase = "http://localhost:5000"

def esperarTecla():
    print(Fore.CYAN + '\n\tPresione ENTER para continuar')
    input()

def listar_profesores():
    response = requests.get(f"{URLbase}/profesores")
    if response.status_code == 200:
        print(response.json())
    else:
        print(Fore.RED + "Error al listar profesores")
    esperarTecla()

def buscar_profesor(entrada):
    response = None
    if entrada.isdigit():
        response = requests.get(f"{URLbase}/profesor/{entrada}")
    else:
        response = requests.get(f"{URLbase}/profesor/nombre/{entrada}")
    
    if response.status_code == 200:
        data = response.json()
        if data:
            print(data)
        else:
            print(Fore.RED + "Profesor no encontrado")
    else:
        print(Fore.RED + "Error al buscar profesor")
    esperarTecla()

def registrar_profesor(id, nombre, correo, direccion):
    data = {
        "id": id,
        "nombre": nombre,
        "correo": correo,
        "direccion": direccion
    }
    response = requests.post(f"{URLbase}/profesor/registrar", json=data)
    if response.status_code == 200:
        print(Fore.GREEN + "Profesor registrado exitosamente")
    else:
        print(Fore.RED + "Error al registrar profesor")
    esperarTecla()

def modificar_profesor(id, nombre, correo, direccion):
    data = {
        "id": id, 
        "nombre": nombre,
        "correo": correo,
        "direccion": direccion
    }
    response = requests.put(f"{URLbase}/profesor/modificar", json=data)
    if response.status_code == 200:
        print(Fore.GREEN + "Profesor modificado con éxito")
    else:
        print(Fore.RED + "Error al modificar profesor")
    esperarTecla()

def eliminar_profesor(id):
    response = requests.delete(f"{URLbase}/profesor/eliminar/{id}")
    if response.status_code == 200:
        print(Fore.GREEN + "Profesor eliminado correctamente")
    else:
        print(Fore.RED + "Error al eliminar profesor")
    esperarTecla()

def menu():
    while True:
        os.system("cls" if os.name == "nt" else "clear")
        
        print(Fore.RED + Style.BRIGHT + ("███╗░░░███╗███████╗███╗  ██╗██╗░░░██╗"))
        print(Fore.BLUE +                "████╗░████║██╔════╝████╗ ██║██║░░░██║")
        print(Fore.WHITE +               "██╔████╔██║█████╗░░██╔██ ██║██║░░░██║")
        print(Fore.RED +                 "██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║")
        print(Fore.BLUE +                "██║░╚═╝░██║███████╗██║░╚═██║╚██████╔╝")
        print(Fore.WHITE +               "╚═╝░░░░░╚═╝╚══════╝╚═╝░░░░░╚═╝░╚═════╝░")
        print()
        print(Fore.CYAN + "     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░")
        print(Fore.WHITE + "       1. Listar todos los profesores")
        print(Fore.WHITE + "       2. Buscar un profesor")
        print(Fore.WHITE + "       3. Registrar un nuevo profesor")
        print(Fore.WHITE + "       4. Modificar datos de un profesor")
        print(Fore.WHITE + "       5. Eliminar un profesor")
        print(Fore.WHITE + "       6. Salir del sistema")

        opcion = input(Fore.YELLOW + Style.BRIGHT + "Seleccione una opción: ")

        os.system("cls" if os.name == "nt" else "clear")

        if opcion == '1':
            listar_profesores()
        elif opcion == '2':
            entrada = input(Fore.YELLOW + 'Ingrese el ID o nombre del profesor: ')
            buscar_profesor(entrada)
        elif opcion == '3':
            id = input(Fore.YELLOW + 'Ingrese el ID del profesor: ')
            nombre = input(Fore.YELLOW + 'Ingrese el nombre del profesor: ')
            correo = input(Fore.YELLOW + 'Ingrese el correo electrónico del profesor: ')
            direccion = input(Fore.YELLOW + 'Ingrese la dirección del profesor: ')
            registrar_profesor(id, nombre, correo, direccion)
        elif opcion == '4':
            id = input(Fore.YELLOW + 'Ingrese el ID del profesor: ')
            nombre = input(Fore.YELLOW + 'Ingrese el nuevo nombre del profesor: ')
            correo = input(Fore.YELLOW + 'Ingrese el nuevo correo electrónico del profesor: ')
            direccion = input(Fore.YELLOW + 'Ingrese la nueva dirección del profesor: ')
            modificar_profesor(id, nombre, correo, direccion)
        elif opcion == '5':
            id = input(Fore.YELLOW + 'Ingrese el ID del profesor: ')
            eliminar_profesor(id)
        elif opcion == '6':
            print(Fore.YELLOW + "Saliendo del sistema... ¡Hasta luego!")
            break
        else:
            print(Fore.RED + 'Opción no válida, por favor intente de nuevo')

menu()
