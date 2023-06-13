import { FornecedorService } from './../fornecedor.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Fornecedor } from '../fornecedor';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fornecedormain',
  templateUrl: './fornecedormain.component.html',
  styleUrls: ['./fornecedormain.component.css']
})
export class FornecedormainComponent implements OnInit{
  fornecedores: Fornecedor[] = [];

  formGroupfornecedormain: FormGroup;

  isEditing: boolean = false;

  constructor(
    private FornecedorService: FornecedorService,
    private formBuilder: FormBuilder
  ) {
    this.formGroupfornecedormain = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      celular: [''],
    });
  } // para o componente chamar o serviço
  ngOnInit(): void {
    this.loadFornecedor();
  }

  loadFornecedor() {
    this.FornecedorService.getFornecedor().subscribe({
      next: (data) => (this.fornecedores = data), //next pega os clientes
      error: (error) => console.log('Error ao chamar o endpoint' + error),
    });
  }

  save() {  
    if (this.isEditing) {
      this.isEditing = false;

      this.FornecedorService.update(this.formGroupfornecedormain.value).subscribe({
        next: () => {
          this.loadFornecedor();

          this.formGroupfornecedormain.reset();
        },
      });
    } else {
      this.FornecedorService.save(this.formGroupfornecedormain.value).subscribe({
        next: (data) => {
          this.fornecedores.push(data);

          this.formGroupfornecedormain.reset();
        },
      });
    }
  }

  remove(fornecedor: Fornecedor): void {
    this.FornecedorService.remove(fornecedor).subscribe({
      next: () => {
        this.fornecedores.splice(this.fornecedores.indexOf(fornecedor), 1);
      },
    }); // this.ClientService.removeClient(client).subscribe({ // forma mais facil de entender //   next: () => this.loadClients() // });
  }

  edit(fornecedor:Fornecedor): void {
    this.formGroupfornecedormain.setValue(fornecedor);

    this.isEditing = true;
  }
}

