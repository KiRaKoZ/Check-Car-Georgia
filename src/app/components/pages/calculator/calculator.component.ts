import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';

interface LoanCalculation {
  monthlyPayment: number;
  totalInterest: number;
  totalPayments: number;
}

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.scss'
})
export class CalculatorComponent implements OnInit {
  loanForm: FormGroup;
  calculation: LoanCalculation = {
    monthlyPayment: 0,
    totalInterest: 0,
    totalPayments: 0
  };

  constructor(private fb: FormBuilder) {
    this.loanForm = this.fb.group({
      vehiclePrice: ['', [Validators.required, Validators.min(0)]],
      interestRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      loanPeriod: ['', [Validators.required, Validators.min(1)]],
      downPayment: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit(): void {
    this.calculateLoan();
  }

  calculateLoan(): void {
    if (this.loanForm.valid) {
      const vehiclePrice = this.loanForm.get('vehiclePrice')?.value;
      const interestRate = this.loanForm.get('interestRate')?.value / 100 / 12;
      const loanPeriod = this.loanForm.get('loanPeriod')?.value;
      const downPayment = this.loanForm.get('downPayment')?.value;

      const loanAmount = vehiclePrice - downPayment;
      const monthlyPayment = (loanAmount * interestRate * Math.pow(1 + interestRate, loanPeriod)) / (Math.pow(1 + interestRate, loanPeriod) - 1);

      this.calculation = {
        monthlyPayment: monthlyPayment,
        totalInterest: (monthlyPayment * loanPeriod) - loanAmount,
        totalPayments: monthlyPayment * loanPeriod
      };
    }
  }
}