/**
 * @author abdel-maliki
 * Date : 19/01/2020
 */

export class User {
  _id: number;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;

  toString(): string{
    return this._id + this.nom + this.prenom + this.telephone + this.adresse;
  }
}
