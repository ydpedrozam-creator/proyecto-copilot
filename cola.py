"""
Estructura de Datos: COLA (Queue)
Una cola es una estructura de datos FIFO (First In, First Out)
El primer elemento que entra es el primero que sale.
"""

class Cola:
    """Implementación de una Cola con lista."""
    
    def __init__(self):
        """Inicializa una cola vacía."""
        self.elementos = []
    
    def encolar(self, elemento):
        """
        Añade un elemento al final de la cola.
        Args:
            elemento: El elemento a añadir.
        """
        self.elementos.append(elemento)
        print(f"✓ Encolado: {elemento}")
    
    def desencolar(self):
        """
        Extrae y retorna el primer elemento de la cola.
        Returns:
            El elemento al frente de la cola.
        Raises:
            IndexError: Si la cola está vacía.
        """
        if self.vacia():
            raise IndexError("No se puede desencolar de una cola vacía")
        elemento = self.elementos.pop(0)
        print(f"✓ Desencolado: {elemento}")
        return elemento
    
    def frente(self):
        """
        Retorna el primer elemento sin eliminarlo.
        Returns:
            El elemento al frente de la cola.
        Raises:
            IndexError: Si la cola está vacía.
        """
        if self.vacia():
            raise IndexError("La cola está vacía")
        return self.elementos[0]
    
    def vacia(self):
        """
        Verifica si la cola está vacía.
        Returns:
            True si está vacía, False en caso contrario.
        """
        return len(self.elementos) == 0
    
    def tamaño(self):
        """
        Retorna la cantidad de elementos en la cola.
        Returns:
            Número de elementos en la cola.
        """
        return len(self.elementos)
    
    def mostrar(self):
        """Muestra todos los elementos de la cola."""
        if self.vacia():
            print("Cola vacía []")
        else:
            print(f"Cola: {self.elementos}")
    
    def vaciar(self):
        """Vacía todos los elementos de la cola."""
        self.elementos.clear()
        print("✓ Cola vaciada")


# ============================================
# EJEMPLOS DE USO
# ============================================

if __name__ == "__main__":
    print("=" * 50)
    print("DEMOSTRACIÓN DE COLA (FIFO)")
    print("=" * 50)
    
    # Crear una cola
    mi_cola = Cola()
    
    print("\n1. Encolando elementos:")
    print("-" * 50)
    mi_cola.encolar("Juan")
    mi_cola.encolar("María")
    mi_cola.encolar("Pedro")
    mi_cola.encolar("Ana")
    mi_cola.mostrar()
    
    print("\n2. Verificando tamaño:")
    print("-" * 50)
    print(f"Tamaño de la cola: {mi_cola.tamaño()}")
    
    print("\n3. Verificando frente:")
    print("-" * 50)
    print(f"Elemento al frente: {mi_cola.frente()}")
    mi_cola.mostrar()
    
    print("\n4. Desencolando elementos (FIFO):")
    print("-" * 50)
    mi_cola.desencolar()  # Juan (primero en entrar, primero en salir)
    mi_cola.desencolar()  # María
    mi_cola.mostrar()
    
    print("\n5. Encolando más elementos:")
    print("-" * 50)
    mi_cola.encolar("Carlos")
    mi_cola.mostrar()
    
    print("\n6. Vaciando la cola completamente:")
    print("-" * 50)
    while not mi_cola.vacia():
        mi_cola.desencolar()
    mi_cola.mostrar()
    
    print("\n7. Intento de desencolar en cola vacía:")
    print("-" * 50)
    try:
        mi_cola.desencolar()
    except IndexError as e:
        print(f"Error: {e}")
    
    print("\n" + "=" * 50)
    print("FIN DE LA DEMOSTRACIÓN")
    print("=" * 50)
