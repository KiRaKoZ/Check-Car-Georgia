import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [CommonModule],
  standalone: true,

})
export class DropdownComponent {
  isDropdownVisible = false;

  // Toggle dropdown visibility on click (for touch devices)
  toggleDropdown(event: MouseEvent) {
    event.stopPropagation(); // Prevent click event from propagating
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Show dropdown on hover
  showDropdown() {
    this.isDropdownVisible = true;
  }

  // Hide dropdown on mouse leave
  hideDropdown() {
    this.isDropdownVisible = false;
  }

  // Close dropdown when clicking outside the dropdown or trigger
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const dropdown = document.querySelector('.dropdown-menu');
    const trigger = document.querySelector('.dropdown-trigger');

    // Close dropdown if clicked outside of the trigger or dropdown
    if (dropdown && !dropdown.contains(event.target as Node) && !trigger?.contains(event.target as Node)) {
      this.isDropdownVisible = false;
    }
  }

  // Stop propagation of click event when clicking inside the dropdown
  dropdownClicked(event: MouseEvent) {
    event.stopPropagation();
  }

  // Close dropdown when an item is clicked
  onItemClick() {
    this.isDropdownVisible = false;  // Hide the dropdown after an item is selected
  }
}