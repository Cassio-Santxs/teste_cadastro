import { Component, OnInit } from '@angular/core';
import { Cliente } from '../Cliente';
import { Guid } from "guid-typescript";
import {FormGroup, FormControl} from '@angular/forms';
import { CepserviceService } from '../cepservice.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

clientes: Cliente[];
formulario: any;
showForm: number;

  constructor(
    private cepService: CepserviceService,
    private http: HttpClient,
    ){}
 
  ngOnInit(): void {
    this.showForm = 0;
    this.exibirCliente();
    this.formulario = new FormGroup({
      clienteId: new FormControl(),
      tipoDeCliente: new FormControl(),
      documento: new FormControl(),
      nomeRazaoSocial: new FormControl(),
      nomeFantasia: new FormControl(),
      cep: new FormControl(),
      endereco: new FormControl(),
      bairro: new FormControl(),
      cidade: new FormControl(),
      telefone: new FormControl(),
      email: new FormControl(),
    });
  }

  consultaCep(valor: any, formulario: any){
    this.cepService.buscar(valor).subscribe((dados) => this.populaForm(dados, this.formulario))
  }

  populaForm(dados: any, formulario: any) {
    this.formulario.patchValue({
      cep: dados.cep,
      endereco: dados.logradouro,
      bairro: dados.bairro,
      cidade: dados.localidade,
    })

  }

  CadastrarCliente(): void{
    this.formulario.value.clienteId = Guid.create().toString();
    const cliente : Cliente = this.formulario.value;
    this.clientes.push(cliente);
    localStorage.setItem('BD', JSON.stringify(this.clientes));
    this.formulario.reset();
  }

  exibirCliente() : void{
    if(localStorage.getItem('BD'))
    {
      this.clientes = JSON.parse(localStorage.getItem('BD')!);
    }
    else 
    {
      this.clientes = []
    }
  }

  selectedType = 'opentype';

  onChange(event: any) {
    this.selectedType = event.target.value;
  }
}
