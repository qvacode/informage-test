# Preguntas técnicas
Responda las siguientes preguntas en un archivo de rebajas llamado Answers.md.

1. ¿Cuánto tiempo dedicó a la prueba de codificación de backend?
   - 3 horas aproximadamente
2. ¿Qué agregarías a tu solución si tuvieras más tiempo?
   - Caching de respuestas
   - Oauth2 usando Google para los estudiantes.
   - Rate limit para la api.
3. ¿Cuales fueron los motivos de tu elección de arquitectura para este tipo de aplicación ?
   - Elegí esta arquitectura porque combina lo mejor de cada tecnología: NestJS proporciona una estructura modular, escalable y fuertemente tipada para construir APIs seguras y bien documentadas, mientras que React permite desarrollar interfaces de usuario dinámicas y componibles. Además, la dockerización asegura que el entorno sea consistente en desarrollo, testing y producción, facilitando el despliegue y la integración continua. Esta combinación ofrece flexibilidad, rendimiento y facilidad de mantenimiento en toda la aplicación.
4. ¿Cómo se pueden gestionar los casos posteriores a la medianoche para que se muestren el mismo día y no el siguiente?
   - Podemos agregar el dia como referencia, de esta forma, la hora es indiferente. Ej: una sesión inicia 24/03 23:00 y finaliza 25/03 01:00, si agregamos la referencia del dia 24, este evento no aparecerá el dia 25 aunque tenga un periodo horario incluso.
5. ¿Cuánto tiempo dedicó a la prueba de codificación frontend? ¿Cuáles fueron tus mayores dificultades?
   - 2 horas aproximadamente
   - No encontré ninguna complejidad
6. ¿Cómo localizaría un problema de rendimiento en producción? ¿Alguna vez has tenido que hacer esto?
   - He usado herramientas de monitoreo en tiempo real mediante integraciones con Prometheus y Grafana. Con esto podemos identificar el consumo de recursos, alertas de problemas, etc.
   - Un beneficio que tenemos directamente de la dockerizacion del proyecto, es el monitoreo de logs. Con Docker, puedo revisar los logs específicos de cada contenedor usando docker logs y monitorear su rendimiento con docker stats. Esto ayuda a detectar posibles cuellos de botella o errores inesperados que afecten la experiencia del usuario.
7. ¿Cuál fue la característica más útil que se agregó a la última versión del lenguaje elegido? Incluya un fragmento de código que muestre cómo lo ha utilizado.
8. ¿Que elementos de seguridad hubiera incluido en su API?
   - Implementaría autenticación robusta (por ejemplo, JWT o OAuth2) para asegurar que solo usuarios autenticados puedan acceder a los endpoints.
   - Establecería un sistema de roles y permisos para controlar el acceso a recursos sensibles.
   - En producción, forzaría el uso de HTTPS para cifrar la comunicación y proteger la información en tránsito.
   - Implementaría rate limiting para evitar ataques de fuerza bruta, limitando la cantidad de peticiones que puede hacer un usuario en un período de tiempo determinado.
   - Configuraría un sistema de logging y monitoreo (por ejemplo, utilizando herramientas como Winston o integraciones con servicios APM) para detectar comportamientos anómalos y responder a incidentes de seguridad de forma oportuna.