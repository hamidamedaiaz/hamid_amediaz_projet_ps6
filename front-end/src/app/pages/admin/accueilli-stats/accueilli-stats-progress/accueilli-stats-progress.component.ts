import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';



interface DonneeProgression {
  mois: string;
  valeur: number;
}

@Component({
  selector: 'app-accueilli-stats-progression',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accueilli-stats-progress.component.html',
  styleUrls: ['./accueilli-stats-progress.component.scss']
})
export class AccueilliStatsProgressionComponent implements OnChanges {
  @Input() donneesParMois: DonneeProgression[] = [];
  @Input() ongletActif: 'score' | 'indices' | 'temps' | 'precision' = 'score';
  
  @Output() changementOnglet = new EventEmitter<'score' | 'indices' | 'temps' | 'precision'>();
  
  valeurMaximale: number = 100;
  donneesAdaptees: DonneeProgression[] = [];
  
  ngOnChanges(changements: SimpleChanges) {
    if (changements['donneesParMois']) {
      this.adapterDonneesPourAffichage();
    }
  }
  
  changerOnglet(onglet: string) {

    const ongletType = onglet as 'score' | 'indices' | 'temps' | 'precision';
    this.changementOnglet.emit(ongletType);

  }
  obtenirTitreOnglet(onglet: string): string {
    switch(onglet) {
      case 'score': return 'Score global';
      case 'indices': return 'Utilisation des indices';
      case 'temps': return 'Temps de réponse';
      case 'precision': return 'Précision';
      default: return '';
    }
  }
  
  obtenirClasseCouleur(onglet: string): string {
    switch(onglet) {
      case 'score': return 'barre-score';
      case 'indices': return 'barre-indices';
      case 'temps': return 'barre-temps';
      case 'precision': return 'barre-precision';
      default: return '';
    }
  }
  
  adapterDonneesPourAffichage() {
    if (!this.donneesParMois || this.donneesParMois.length === 0) {
      this.donneesAdaptees = [];
      return;
    }
    
    this.valeurMaximale = 0;
    for (let i = 0; i < this.donneesParMois.length; i++) {
      if (this.donneesParMois[i].valeur > this.valeurMaximale) {
        this.valeurMaximale = this.donneesParMois[i].valeur;
      }
    }
    
    if (this.valeurMaximale === 0) {
      this.valeurMaximale = 1;
    }
    
    this.donneesAdaptees = [];
    for (let i = 0; i < this.donneesParMois.length; i++) {
      const pourcentage = Math.round((this.donneesParMois[i].valeur / this.valeurMaximale) * 100);
      this.donneesAdaptees.push({
        mois: this.donneesParMois[i].mois,
        valeur: pourcentage
      });
    }
  }
  
  formaterValeurAffichee(valeurOriginale: number): string {
    if (this.ongletActif === 'temps') {
      return valeurOriginale + 's';
    }
    return valeurOriginale + (this.ongletActif === 'score' || this.ongletActif === 'precision' ? '%' : '');
  }
  
  creerTexteAide(donnee: DonneeProgression): string {
    const nomMetrique = this.obtenirTitreOnglet(this.ongletActif).toLowerCase();
    return nomMetrique + ' en ' + donnee.mois + ': ' + donnee.valeur + (this.ongletActif === 'temps' ? 's' : '%');
  }
}