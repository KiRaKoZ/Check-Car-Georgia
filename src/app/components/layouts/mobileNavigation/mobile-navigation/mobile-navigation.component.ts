import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobile-navigation',
  imports: [CommonModule],
  templateUrl: './mobile-navigation.component.html',
  styleUrl: './mobile-navigation.component.scss',
  animations: [
    trigger("slideInOut", [
      state(
        "in",
        style({
          "max-height": "500px",
          opacity: "1",
          visibility: "visible",
        }),
      ),
      state(
        "out",
        style({
          "max-height": "0px",
          opacity: "0",
          visibility: "hidden",
        }),
      ),
      transition("in => out", [animate("300ms ease-in-out")]),
      transition("out => in", [animate("300ms ease-in-out")]),
    ]),
  ],
})
export class MobileNavigationComponent implements OnInit {
  menuItems: Array<{ name: string; isOpen: boolean; subItems: string[] }> = [
    { name: "Home", isOpen: false, subItems: ["Dashboard", "Analytics"] },
    { name: "Inventory", isOpen: false, subItems: ["Products", "Categories"] },
    { name: "Blog", isOpen: false, subItems: ["Posts", "Comments"] },
    { name: "Shop", isOpen: false, subItems: ["Orders", "Customers"] },
    { name: "Pages", isOpen: false, subItems: ["About", "Contact"] },
    { name: "Contact", isOpen: false, subItems: ["Email", "Phone"] },
  ];

  ngOnInit(): void {}

  toggleSubMenu(item: {
    name: string;
    isOpen: boolean;
    subItems: string[];
  }): void {
    item.isOpen = !item.isOpen;
  }
}


// import { trigger, state, style, transition, animate } from '@angular/animations';
// import { CommonModule } from '@angular/common';
// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-mobile-navigation',
//   imports: [CommonModule],
//   standalone: true,
//   templateUrl: './mobile-navigation.component.html',
//   styleUrl: './mobile-navigation.component.scss',
//   animations: [
//     trigger('slideAnimation', [
//       state('left', style({ transform: 'translateX(0)' })),
//       state('right', style({ transform: 'translateX(-100%)' })),
//       transition('left <=> right', animate('300ms ease-in-out'))
//     ])
//   ]
// })
// export class MobileNavigationComponent implements OnInit {
//   currentState: 'left' | 'right' = 'left';

//   ngOnInit(): void {}

//   showPages(): void {
//     this.currentState = 'right';
//   }

//   goBack(): void {
//     this.currentState = 'left';
//   }
// }
