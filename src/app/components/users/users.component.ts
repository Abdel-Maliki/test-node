import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../models/User";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  private _docSub: Subscription;
  private _docSubs: Subscription;
  form: FormGroup;

  columns: string[] = ['nom', 'prenom', 'adresse', 'telephone', 'actions'];
  userData = new MatTableDataSource<User>();

  constructor(public formBuilder: FormBuilder, public chatService: UsersService) {
  }

  model: User;

  ngOnInit() {
    this.model = new User();
    this.getChat();
    this.buildForm();
    this.subscribeAll();
    this.setFormData(this.model);
    this.subscribe();
  }

  subscribeAll() {
    this._docSubs = this.chatService
      .subscribAll()
      .subscribe((value: any) => {
        this.userData.data = value;
      });
  }

  getChat() {
    this.chatService.findAll().subscribe((value: any) => {
      this.userData.data = value;
    });
  }

  protected buildForm() {
    if (!this.model) {
      this.model = new User();
    }
    this.form = this.formBuilder.group({
      nom: [this.model.nom, [Validators.required]],
      prenom: [this.model.prenom, [Validators.required]],
      telephone: [this.model.telephone, [Validators.required]],
      adresse: [this.model.adresse, []],
    });
  }

  save(): void {
    this.chatService.save(this.model).subscribe(() => this.restart());
  }

  restart() {
    this.model = new User();
    this.setFormData(this.model);
    this._docSub ? this._docSub.unsubscribe() : '';
  }

  update() {
    this._docSub ? this._docSub.unsubscribe() : '';
    this.chatService.update(this.model._id, this.model).subscribe(() => this.restart());
  }

  delete(model?: User) {
    this.chatService.delete(model._id).subscribe(() => this.restart());
  }

  toUpdate(model?: User) {

    model = JSON.parse(JSON.stringify(model));
    this.setFormData(model);
    this.subscribeUser(model._id);
  }

  subscribeUser(id) {
    this._docSub = this.chatService.subscribeUser(id).subscribe((value: any) => {
      if (value.operationType === 'update') {
        const model = value.data && value.data.length > 0 ? value.data[0] : new User();
        this.setFormData(model);
      } else if (value.operationType === 'delete') {
        this.restart();
      }
    });
  }

  private setFormData(model: User) {
    this.model = model;
    this.form.get('nom').setValue(model.nom);
    this.form.get('prenom').setValue(model.prenom);
    this.form.get('adresse').setValue(model.adresse);
    this.form.get('telephone').setValue(model.telephone);
  }

  private subscribe() {
    if (!this.form) {
      this.buildForm();
    }
    this.form.get('nom').valueChanges.subscribe(value => this.model.nom = value);
    this.form.get('prenom').valueChanges.subscribe(value => this.model.prenom = value);
    this.form.get('adresse').valueChanges.subscribe(value => this.model.adresse = value);
    this.form.get('telephone').valueChanges.subscribe(value => this.model.telephone = value);
  }

  ngOnDestroy(): void {
    this._docSub ? this._docSub.unsubscribe() : '';
    this._docSubs ? this._docSubs.unsubscribe() : '';
  }

}
