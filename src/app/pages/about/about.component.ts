import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  downloadCV(format: 'pdf' | 'jpg'): void {
    // Aquí se implementaría la descarga del CV
    // Por ahora, simplemente mostramos un mensaje
    const fileName = format === 'pdf' ? 'CV_Camilo_Silva.pdf' : 'CV_Camilo_Silva.jpg';
    
    // Simular descarga
    console.log(`Descargando ${fileName}`);
    
    // En una implementación real, aquí estaría el código para descargar el archivo
    // Por ejemplo:
    // const link = document.createElement('a');
    // link.href = `/assets/cv/${fileName}`;
    // link.download = fileName;
    // link.click();
    
    alert(`Descarga de ${fileName} iniciada`);
  }
}
