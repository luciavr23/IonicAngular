import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalPokemonPage } from './modal-pokemon.page';

describe('ModalPokemonPage', () => {
  let component: ModalPokemonPage;
  let fixture: ComponentFixture<ModalPokemonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
