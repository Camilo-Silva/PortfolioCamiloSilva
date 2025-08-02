import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  isDownloading = false; // Para mostrar estado de descarga
  downloadMessage = ''; // Para mostrar mensajes de feedback

  downloadCV(format: 'pdf' | 'jpg'): void {
    if (this.isDownloading) {
      return; // Evitar múltiples descargas simultáneas
    }
    
    this.isDownloading = true;
    this.downloadMessage = '';
    const fileName = format === 'pdf' ? 'CV.pdf' : 'CV.jpg';
    const filePath = `/assets/images/${fileName}`;
    const downloadName = `CV_Camilo_Silva.${format}`;
    
    try {
      // Verificar si el archivo existe antes de intentar descargarlo
      this.checkFileExists(filePath).then(exists => {
        if (exists) {
          // Crear elemento de enlace temporal para la descarga
          const link = document.createElement('a');
          link.href = filePath;
          link.download = downloadName;
          link.target = '_blank';
          
          // Agregar al DOM temporalmente
          document.body.appendChild(link);
          
          // Hacer clic programáticamente
          link.click();
          
          // Remover del DOM
          document.body.removeChild(link);
          
          // Mostrar mensaje de éxito
          this.downloadMessage = `✅ CV en formato ${format.toUpperCase()} descargado correctamente`;
          console.log(`Descarga de CV en formato ${format.toUpperCase()} iniciada`);
          
          // Limpiar mensaje después de 3 segundos
          setTimeout(() => {
            this.downloadMessage = '';
          }, 3000);
          
        } else {
          throw new Error(`El archivo ${fileName} no se encuentra disponible`);
        }
      }).catch(error => {
        console.error('Error al descargar el archivo:', error);
        this.downloadMessage = `❌ Error: ${error.message || 'No se pudo descargar el archivo'}`;
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.downloadMessage = '';
        }, 5000);
      }).finally(() => {
        this.isDownloading = false;
      });
      
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      this.downloadMessage = `❌ Error al descargar el CV en formato ${format.toUpperCase()}`;
      this.isDownloading = false;
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        this.downloadMessage = '';
      }, 5000);
    }
  }

  // Método auxiliar para verificar si un archivo existe
  private async checkFileExists(url: string): Promise<boolean> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  }
}
