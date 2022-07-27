import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const UNDO_ICON = `<svg id="undo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.13 24.63">
  <defs>
    <style>#undo-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <polyline class="cls-1" points="10.07 0.57 5.57 4.97 10.07 9.47"/>
  <path class="cls-1" d="M.57,14.57a9.5,9.5,0,1,0,9.5-9.5h-4"/>
</svg>`;
const REDO_ICON = `<svg id="redo-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.14 24.63">
  <defs>
    <style>#redo-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <polyline class="cls-1" points="9.97 0.57 14.47 4.97 9.97 9.47"/>
  <path class="cls-1" d="M19.57,14.57a9.5,9.5,0,0,1-19,0A9.29,9.29,0,0,1,10,5.07h4"/>
</svg>`;
const FULL_SCREEN_ICON = `<svg id="full-screen-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.43 22.43">
  <defs>
    <style>#full-screen-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <polyline class="cls-1" points="0.57 5.47 0.57 0.57 5.37 0.57"/>
  <line class="cls-1" x1="6.47" y1="6.57" x2="0.57" y2="0.57"/>
  <polyline class="cls-1" points="5.37 21.87 0.57 21.87 0.57 17.07"/>
  <line class="cls-1" x1="6.47" y1="15.97" x2="0.57" y2="21.87"/>
  <polyline class="cls-1" points="16.97 0.57 21.87 0.57 21.87 5.47"/>
  <line class="cls-1" x1="15.87" y1="6.57" x2="21.87" y2="0.57"/>
  <polyline class="cls-1" points="21.87 17.07 21.87 21.87 16.97 21.87"/>
  <line class="cls-1" x1="15.87" y1="15.97" x2="21.87" y2="21.87"/>
</svg>`;
const NO_FULL_SCREEN_ICON = `<svg id="no-full-screen-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.43 22.43">
  <defs>
    <style>#no-full-screen-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <polyline class="cls-1" points="6.47 1.67 6.47 6.57 1.57 6.57"/>
  <line class="cls-1" x1="0.57" y1="0.57" x2="6.47" y2="6.57"/>
  <polyline class="cls-1" points="1.67 15.97 6.47 15.97 6.47 20.87"/>
  <line class="cls-1" x1="0.57" y1="21.87" x2="6.47" y2="15.97"/>
  <polyline class="cls-1" points="20.77 6.57 15.87 6.57 15.87 1.67"/>
  <line class="cls-1" x1="21.87" y1="0.57" x2="15.87" y2="6.57"/>
  <polyline class="cls-1" points="15.87 20.77 15.87 15.97 20.77 15.97"/>
  <line class="cls-1" x1="21.87" y1="21.87" x2="15.87" y2="15.97"/>
</svg>`;
const TEXT_ICON = `<svg id="text-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.33 19.73">
  <defs>
    <style>#text-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <line class="cls-1" x1="9.17" y1="0.57" x2="9.17" y2="18.97"/>
  <line class="cls-1" x1="12.17" y1="19.17" x2="6.17" y2="19.17"/>
  <polyline class="cls-1" points="17.77 5.87 17.77 0.57 0.57 0.57 0.57 5.87"/>
</svg>`;
const SQUARE_ICON = `<svg id="square-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.59 19.59">
  <defs>
    <style>#square-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 0.99;
    }</style>
  </defs>
  <rect class="cls-1" x="0.5" y="0.5" width="18.6" height="18.6"/>
</svg>`;
const CIRCLE_ICON = `<svg id="circle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.53 22.53">
  <defs>
    <style>#circle-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-miterlimit: 10;
      stroke-width: 1.13;
    }</style>
  </defs>
  <circle class="cls-1" cx="11.27" cy="11.27" r="10.7"/>
</svg>`;
const RECTANGLE_ICON = `<svg id="rectangle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24.09 17.19">
  <defs>
    <style>#rectangle-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 0.99;
    }</style>
  </defs>
  <rect class="cls-1" x="0.5" y="0.5" width="23.1" height="16.2"/>
</svg>`;
const HEXAGON_ICON = `<svg id="hexagon-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.44 20.44">
  <defs>
    <style>#hexagon-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.04;
    }</style>
  </defs>
  <polygon class="cls-1" points="17.32 0.52 6.12 0.52 0.52 10.22 6.12 19.92 17.32 19.92 22.92 10.22 17.32 0.52"/>
</svg>`;
const TRIANGLE_ICON = `<svg id="triangle-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26.2 21.75">
  <defs>
    <style>#triangle-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <polygon class="cls-1" points="25.63 21.18 0.57 21.18 13.1 0.57 25.63 21.18"/>
</svg>`;
const ERASER_ICON = `<svg id="eraser-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.73 18.73">
  <defs>
    <style>#eraser-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }
    #eraser-icon .cls-2 {
      fill: currentColor;
    }</style>
  </defs>
  <path class="cls-1"
        d="M1.77,15h0a4.1,4.1,0,0,1,0-5.8l7.4-7.4a4.1,4.1,0,0,1,5.8,0l2.6,2.6a4.1,4.1,0,0,1,0,5.8l-4.9,4.9A7.82,7.82,0,0,1,1.77,15Z"/>
  <path class="cls-2" d="M13.87,13.87l-8.4-8.4,2.9-2.9a5.31,5.31,0,0,1,7.4,0l1,1a5.31,5.31,0,0,1,0,7.4Z"/>
  <line class="cls-1" x1="7.37" y1="18.17" x2="19.17" y2="18.17"/>
</svg>`;
const CLOSE_ICON = `<svg id="close-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.52 19.52">
  <defs>
    <style>#close-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.42;
    }</style>
  </defs>
  <line class="cls-1" x1="18.81" y1="18.81" x2="0.71" y2="0.71"/>
  <line class="cls-1" x1="0.71" y1="18.81" x2="18.81" y2="0.71"/>
</svg>`;
const HAND_ICON = `<svg id="hand-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.93 23.93">
  <defs>
    <style>#hand-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <path class="cls-1"
        d="M5.57,15.37l-2.1-4.1v.1a1.57,1.57,0,0,0-1.4-.9A1.54,1.54,0,0,0,.57,12a1.27,1.27,0,0,0,.1.6h0l4.4,9.9a1.57,1.57,0,0,0,1.4.9h8.3a1.54,1.54,0,0,0,1.5-1.5L17.37,11a1.5,1.5,0,0,0-3,0v-.5a1.5,1.5,0,0,0-3,0V10a1.5,1.5,0,0,0-3,0V2.07A1.54,1.54,0,0,0,6.87.57a1.54,1.54,0,0,0-1.5,1.5v13.3Z"/>
</svg>`;
const MARKER_ICON = `<svg id="marker-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.59 23.59">
  <defs>
    <style>#marker-icon .cls-1 {
      fill: currentColor;
    }
    #marker-icon .cls-2 {
      fill: none;
      stroke: currentColor;
      stroke-miterlimit: 10;
      stroke-width: 1.13;
    }</style>
  </defs>
  <path class="cls-1" d="M3.09,17.6s-4,4.7-2.9,5.8S6,20.5,6,20.5Z"/>
  <path class="cls-2" d="M4.49,19.1h0a3.26,3.26,0,0,1,0-4.5L18.29.8l4.5,4.5L9,19.1A3.26,3.26,0,0,1,4.49,19.1Z"/>
</svg>`;
const PENCIL_ICON = `<svg id="pencil-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.59 23.59">
  <defs>
    <style>#pencil-icon .cls-1 {
      fill: currentColor;
    }
    #pencil-icon .cls-2 {
      fill: currentColor;
      fill-rule: evenodd;
    }</style>
  </defs>
  <g transform="translate(0 -1.214)">
    <path class="cls-1" d="M21.156,5.052l1.9,1.9L9.947,20.062l-1.9-1.9Zm0-1.608L6.438,18.162l3.509,3.509L24.665,6.953Z" transform="translate(-2.776 -0.962)"/>
    <g transform="translate(0 1.214)">
      <path class="cls-1" d="M.739,36.486a.722.722,0,0,1-.516-.215.745.745,0,0,1-.15-.852l3.59-6.1,3.508,3.508L1.122,36.394a.892.892,0,0,1-.383.092" transform="translate(0 -13.334)"/>
      <path class="cls-2" d="M35.662,2l-.077-.077a2.426,2.426,0,0,0-3.431,0L30.646,3.433l3.508,3.508,1.508-1.508a2.426,2.426,0,0,0,0-3.431" transform="translate(-13.216 -1.214)"/>
    </g>
  </g>
</svg>`;
const SAVE_ICON = `<svg id="save-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.31 23.31">
  <defs>
    <style>#save-icon .cls-1 {
      fill: currentColor;
    }
    #save-icon .cls-2 {
      fill: #fff;
    }
    #save-icon .cls-3 {
      fill: none;
      stroke: currentColor;
      stroke-miterlimit: 10;
      stroke-width: 2;
    }</style>
  </defs>
  <polygon class="cls-1" points="17.02 1 1 1 1 22.31 22.31 22.31 22.31 6.28 17.02 1"/>
  <path class="cls-2"
        d="M11.65,15.49A1.55,1.55,0,1,1,10.11,17a1.54,1.54,0,0,1,1.54-1.54m0-2A3.55,3.55,0,1,0,15.2,17a3.54,3.54,0,0,0-3.55-3.54Z"/>
  <path class="cls-2"
        d="M1,1.62H14.34A2.37,2.37,0,0,1,16.7,4v2.1a2.37,2.37,0,0,1-2.37,2.37H1a0,0,0,0,1,0,0V1.62A0,0,0,0,1,1,1.62Z"/>
  <polygon class="cls-3" points="17.02 1 1 1 1 22.31 22.31 22.31 22.31 6.28 17.02 1"/>
</svg>`;
const ARROW_ICON = `<svg id="arrow-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.23 22.2">
  <defs>
    <style>#arrow-icon .cls-1, #arrow-icon .cls-2 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    #arrow-icon .cls-1 {
      stroke-width: 1.42;
    }
    #arrow-icon .cls-2 {
      stroke-width: 1.13;
    }</style>
  </defs>
  <line class="cls-1" x1="0.71" y1="21.49" x2="20.85" y2="1.35"/>
  <polyline class="cls-2" points="21.66 6.83 21.66 0.57 15.34 0.57"/>
</svg>`;
const LINE_ICON = `<svg id="line-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21.62 21.62">
  <defs>
    <style>#line-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.42;
    }</style>
  </defs>
  <line class="cls-1" x1="0.71" y1="20.91" x2="20.91" y2="0.71"/>
</svg>`;
const DELIMITED_LINE_ICON = `<svg id="delimited-line-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.63 6.53">
  <defs>
    <style>#delimited-line-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }</style>
  </defs>
  <line class="cls-1" x1="0.77" y1="3.27" x2="22.77" y2="3.27"/>
  <line class="cls-1" x1="0.57" y1="0.57" x2="0.57" y2="5.97"/>
  <line class="cls-1" x1="23.07" y1="0.57" x2="23.07" y2="5.97"/>
</svg>`;
const FILL_ICON = `<svg id="fill-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.73 21.43">
  <defs>
    <style>#fill-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }
    #fill-icon .cls-2 {
      fill: currentColor;
    }</style>
  </defs>
  <line class="cls-1" x1="10.57" y1="20.87" x2="20.17" y2="20.87"/>
  <line class="cls-1" x1="4.17" y1="0.57" x2="8.57" y2="4.97"/>
  <path class="cls-1" d="M17.27,9.67l-7.4,7.4a2.9,2.9,0,0,1-4.2,0l-4.2-4.2a2.9,2.9,0,0,1,0-4.2l7.4-7.4Z"/>
  <path class="cls-2" d="M2.47,7.77l14.8,2-7.4,7.4a2.9,2.9,0,0,1-4.2,0L1.47,13a2.9,2.9,0,0,1,0-4.2Z"/>
  <path class="cls-2"
        d="M19.67,16.17a2.32,2.32,0,0,1-2.1,2.4,2.25,2.25,0,0,1-2.1-2.4,11.08,11.08,0,0,1,1.6-3.8.57.57,0,0,1,1,0A11.08,11.08,0,0,1,19.67,16.17Z"/>
</svg>`;
const SELECT_ICON = `<svg id="select-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 11.59 15.82">
  <defs>
    <style>#select-icon .cls-1{fill:none;}
    #select-icon .cls-2{clip-path:url(#select-icon-clip-path);}
    #select-icon .cls-3{fill:currentColor;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;}</style>
    <clipPath id="select-icon-clip-path" transform="translate(-7.28 -5.56)">
      <rect class="cls-1" width="23.32" height="25.31" rx="4"/>
    </clipPath>
  </defs>
  <g>
    <g>
      <g>
        <g class="cls-2">
          <g>
            <path class="cls-3" d="M14.58,20.74a.27.27,0,0,0,.17.13.26.26,0,0,0,.21,0l2-1.17a.3.3,0,0,0,.1-.39L14,13.88l4.18-1.39a.27.27,0,0,0,.19-.23.29.29,0,0,0-.14-.28l-8-4.67L8.19,6.1a.26.26,0,0,0-.27,0,.27.27,0,0,0-.14.24V18.11a.28.28,0,0,0,.16.26.26.26,0,0,0,.3-.05l3.28-3Z" transform="translate(-7.28 -5.56)"/>
          </g>
        </g>
      </g>
    </g>
  </g>
</svg>`;
const MOVE_ICON = `<svg id="move-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
  <defs>
    <style>#move-icon .cls-1{fill:currentColor;}</style>
  </defs>
  <g class="cls-1">
    <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path>
    <path d="M0 0h24v24H0z" fill="none"></path>
  </g>
</svg>`

export function loadIcons(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
  iconRegistry.addSvgIconLiteral('undo', sanitizer.bypassSecurityTrustHtml(UNDO_ICON));
  iconRegistry.addSvgIconLiteral('redo', sanitizer.bypassSecurityTrustHtml(REDO_ICON));
  iconRegistry.addSvgIconLiteral('full-screen', sanitizer.bypassSecurityTrustHtml(FULL_SCREEN_ICON));
  iconRegistry.addSvgIconLiteral('no-full-screen', sanitizer.bypassSecurityTrustHtml(NO_FULL_SCREEN_ICON));
  iconRegistry.addSvgIconLiteral('text', sanitizer.bypassSecurityTrustHtml(TEXT_ICON));
  iconRegistry.addSvgIconLiteral('square', sanitizer.bypassSecurityTrustHtml(SQUARE_ICON));
  iconRegistry.addSvgIconLiteral('circle', sanitizer.bypassSecurityTrustHtml(CIRCLE_ICON));
  iconRegistry.addSvgIconLiteral('rectangle', sanitizer.bypassSecurityTrustHtml(RECTANGLE_ICON));
  iconRegistry.addSvgIconLiteral('hexagon', sanitizer.bypassSecurityTrustHtml(HEXAGON_ICON));
  iconRegistry.addSvgIconLiteral('triangle', sanitizer.bypassSecurityTrustHtml(TRIANGLE_ICON));
  iconRegistry.addSvgIconLiteral('eraser', sanitizer.bypassSecurityTrustHtml(ERASER_ICON));
  iconRegistry.addSvgIconLiteral('close', sanitizer.bypassSecurityTrustHtml(CLOSE_ICON));
  iconRegistry.addSvgIconLiteral('hand', sanitizer.bypassSecurityTrustHtml(HAND_ICON));
  iconRegistry.addSvgIconLiteral('marker', sanitizer.bypassSecurityTrustHtml(MARKER_ICON));
  iconRegistry.addSvgIconLiteral('pencil', sanitizer.bypassSecurityTrustHtml(PENCIL_ICON));
  iconRegistry.addSvgIconLiteral('save', sanitizer.bypassSecurityTrustHtml(SAVE_ICON));
  iconRegistry.addSvgIconLiteral('arrow', sanitizer.bypassSecurityTrustHtml(ARROW_ICON));
  iconRegistry.addSvgIconLiteral('line', sanitizer.bypassSecurityTrustHtml(LINE_ICON));
  iconRegistry.addSvgIconLiteral('delimited-line', sanitizer.bypassSecurityTrustHtml(DELIMITED_LINE_ICON));
  iconRegistry.addSvgIconLiteral('fill', sanitizer.bypassSecurityTrustHtml(FILL_ICON));
  iconRegistry.addSvgIconLiteral('select', sanitizer.bypassSecurityTrustHtml(SELECT_ICON));
  iconRegistry.addSvgIconLiteral('move', sanitizer.bypassSecurityTrustHtml(MOVE_ICON));
}
