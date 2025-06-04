// SCORM.js

class ScormManager {
  static init() {
    if (typeof API !== "undefined") {
      API.LMSInitialize("");
      API.LMSSetValue("cmi.lesson_status", "incomplete");
      API.LMSCommit("");
    } else {
      console.log("SCORM no disponible. Modo web.");
    }
  }

  static guardarProgreso(pagina) {
    // Remover 'views/' del inicio de la ruta si existe
    pagina = pagina.replace('views/', '');
    
    const paginasCurso = ScormManager.paginasCurso;
    const paginaIndex = paginasCurso.indexOf(pagina);

    if (paginaIndex === -1) {
      console.warn("Página no registrada en el curso:", pagina);
      return;
    }

    const porcentaje = Math.round(((paginaIndex + 1) / paginasCurso.length) * 100);

    if (typeof API !== "undefined") {
      API.LMSSetValue("cmi.core.lesson_location", pagina);
      API.LMSSetValue("cmi.core.score.raw", porcentaje.toString());
      if (porcentaje === 100) {
        API.LMSSetValue("cmi.lesson_status", "completed");
      }
      API.LMSCommit("");
    } else {
      localStorage.setItem("ultimaPagina", pagina);
      localStorage.setItem("porcentaje", porcentaje);
    }

    // Actualizar la barra de progreso visual
    const barra = document.getElementById("progreso-barra");
    const texto = document.getElementById("progreso-texto");
    if (barra && texto) {
      barra.style.width = porcentaje + "%";
      texto.textContent = porcentaje + "%";
    }

    console.log(`✅ Progreso guardado: ${porcentaje}% (${pagina})`);
  }

  static cargarProgreso() {
    if (typeof API !== "undefined") {
      const pagina = API.LMSGetValue("cmi.core.lesson_location");
      const score = API.LMSGetValue("cmi.core.score.raw");
      return { ultimaPagina: pagina, score };
    } else {
      const pagina = localStorage.getItem("ultimaPagina");
      const score = localStorage.getItem("porcentaje");
      return { ultimaPagina: pagina, score };
    }
  }
}

// 👉 Lista actualizada de páginas del curso según el menú actual
ScormManager.paginasCurso = [
  "modules.html",
  "module1.html",
  // Módulo 1: Introducción a la Seguridad
  "pagina11.html", // Objetivo
  "pagina12.html", // Sistema de seguridad integrado
  "pagina13.html", // Reglas de oro que protegen la vida
  "pagina14.html", // Análisis de trabajo seguro (ATS)
  "pagina15.html", // Practicas de mantenimiento para control del riesgo
  "pagina16.html", // Condiciones del área de trabajo
  "pagina17.html", // Equipo de protección personal (EPP)
  "pagina18.html", // Elementos de seguridad en la máquina
  
  // Módulo 2: Conocimiento de la Máquina
  "module2.html",
  "pagina21.html", // Objetivo
  "pagina22.html", // Características técnicas
  "pagina23.html", // Dimensiones de la máquina
  "pagina24.html", // Etiquetas de seguridad
  "pagina25.html", // Placas y números de serie
  "pagina26.html", // Componentes principales
  "pagina27.html", // Partes del montacargas
  "pagina28.html", // Panel de visualización
  "pagina29.html", // Sistema tren de potencia
  "pagina210.html", // Sistema Motor
  "pagina211.html", // Sistema hidráulico
  "pagina212.html", // Sistema de dirección
  "pagina213.html", // Sistema eléctrico
  "pagina214.html", // Sistema de monitoreo electrónico
  "pagina215.html", // Tablero de medidores
  "pagina216.html", // Iconos de advertencia y luces indicadoras
  "pagina217.html", // Caja de interruptores
  "pagina218.html", // Capacidad de fluidos

  // Módulo 3: Mantenimiento
  "module3.html",
  "pagina31.html", // Objetivo
  "pagina32.html", // Propósito de mantenimiento
  "pagina33.html", // Diagrama - Mantenimiento
  "pagina34.html", // Limpieza de la máquina
  "pagina35.html", // Plan de mantenimiento
  "pagina361.html", // Cada 10 horas - Inspección diaria
  // Cada 250 horas
  "pagina371.html", // Sistema motor
  "pagina372.html", // Trasmisión
  "pagina373.html", // Transmisión de potencia
  "pagina374.html", // Cilindro de elevación
  "pagina375.html", // Componentes hidráulicos
  "pagina376.html", // Estructura
  "pagina377.html", // Mástil
  "pagina378.html", // Sistema Eléctrico / Instrumentos / Monitoreo
  // Cada 500 horas
  "pagina381.html", // Sistema motor
  "pagina382.html", // Trasmisión
  "pagina383.html", // Transmisión de potencia
  "pagina384.html", // Eje posterior
  "pagina385.html", // Cilindros
  "pagina386.html", // Componentes hidráulicos
  "pagina387.html", // Mástil
  "pagina388.html", // Estructura
  "pagina389.html", // Sistema Eléctrico / Instrumentos / Monitoreo
  // Cada 1000 horas
  "pagina391.html", // Sistema motor
  "pagina392.html", // Trasmisión
  "pagina393.html", // Transmisión de potencia
  "pagina394.html", // Eje posterior
  "pagina395.html", // Cilindros
  "pagina396.html", // Componentes hidráulicos
  "pagina397.html", // Mástil
  "pagina398.html", // Estructura
  "pagina399.html", // Sistema Eléctrico / Instrumentos / Monitoreo
  // Cada 2000 horas
  "pagina3101.html", // Sistema motor
  "pagina3102.html", // Trasmisión
  "pagina3103.html", // Transmisión de potencia
  "pagina3104.html", // Eje posterior
  "pagina3105.html", // Cilindros
  "pagina3106.html", // Componentes hidráulicos
  "pagina3107.html", // Mástil
  "pagina3108.html", // Estructura
  "pagina3109.html", // Sistema Eléctrico / Instrumentos / Monitoreo
  // Lubricación y Reemplazo
  "pagina3111.html", // Tabla de lubricación
  "pagina3112.html", // Tabla de piezas a reemplazarse periódicamente

  // Módulo 4: Diagnóstico y Solución de Problemas
  "module4.html", 
  "pagina41.html", // Objetivo
  "pagina42.html", // Documentación de inspección
  "pagina43.html", // Anomalías comunes en la máquina
  "pagina44.html", // Herramientas de Diagnóstico en el Análisis de Falla
  "pagina45.html", // Categorías de advertencia
  "pagina46.html", // Flujograma
  "pagina47.html", // Procedimiento estándar de detección de fallas
  // Eventos de máquina
  "pagina481.html", // Eventos de operación – Presión de aceite
  "pagina482.html", // Eventos de operación – Temperatura de motor
  "pagina483.html", // Eventos de operación – Temperatura de transmisión
  "pagina484.html", // Eventos de operación – Combustible
  "pagina485.html", // Eventos de operación – Horómetro
  "pagina486.html", // Sistema de interbloqueo del mástil
  "pagina487.html", // Sistema de interbloqueo de conducción
  "pagina49.html", // Eventos operacionales comunes
  "pagina410.html" // Recomendaciones para la operación de la máquina
];

// 👉 Lo hace accesible globalmente
window.ScormManager = ScormManager;
