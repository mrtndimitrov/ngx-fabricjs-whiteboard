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
const MOVE_ICON = `<svg id="move-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <style>#move-icon .cls-1{fill:currentColor;}</style>
  </defs>
  <g class="cls-1">
    <path d="M10 9h4V6h3l-5-5-5 5h3v3zm-1 1H6V7l-5 5 5 5v-3h3v-4zm14 2l-5-5v3h-3v4h3v3l5-5zm-9 3h-4v3H7l5 5 5-5h-3v-3z"></path>
    <path d="M0 0h24v24H0z" fill="none"></path>
  </g>
</svg>`;
const BOLD_ICON = `<svg id="bold-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202 202">
  <defs>
    <style>#bold-icon .cls-1{stroke:currentColor;}</style>
  </defs>
  <path class="cls-1" d="M148.004,94.812c18.332-8.126,28.671-23.362,28.671-42.752c0-17.261-6.954-31.206-20.11-40.328
    C145.653,4.166,130.438,0,113.721,0H16.957v34h17v134h-17v34h90.905c14.819,0,35.992-2.245,52.705-12.94
    c16.241-10.393,24.476-26.161,24.476-46.868C185.043,118.342,171.057,100.763,148.004,94.812z M103.12,80H73.957V34h26.096
    c25.961,0,36.551,6.34,36.551,21.884C136.604,75.816,118.396,80,103.12,80z M73.957,115h30.838c28.537,0,40.177,7.436,40.177,25.663
    c0,18.14-13.987,27.337-41.572,27.337H73.957V115z"/>
</svg>`;
const ITALIC_ICON = `<svg id="italic-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.538 29.538">
  <defs>
    <style>#italic-icon .cls-1{stroke:currentColor;}</style>
  </defs>
  <g>
    <path class="cls-1" d="M11.305,0.807L11.544,0h14.422l-0.284,0.807c-1.307,0-2.305,0.289-2.994,0.871c-0.688,0.58-1.297,1.793-1.818,3.637
        l-5.401,18.908c-0.394,1.336-0.589,2.23-0.589,2.68c0,0.523,0.204,0.931,0.609,1.222c0.521,0.377,1.512,0.58,2.964,0.608
        l-0.22,0.806H3.572l0.24-0.806c1.467,0,2.541-0.28,3.225-0.838c0.683-0.561,1.3-1.783,1.852-3.672l5.446-18.908
        c0.333-1.162,0.501-2.041,0.501-2.635c0-0.537-0.203-0.959-0.609-1.266C13.817,1.11,12.844,0.909,11.305,0.807z"/>
  </g>
</svg>`;
const UNDERLINE_ICON = `<svg id="underline-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 970.5 970.5">
  <defs>
    <style>#underline-icon .cls-1{stroke:currentColor;}</style>
  </defs>
  <g>
    <path class="cls-1" d="M116.1,868.5c-28.2,0-51,22.8-51,51s22.8,51,51,51h741.5c28.199,0,51-22.8,51-51s-22.801-51-51-51H116.1z"/>
    <path class="cls-1" d="M940.9,45.1c0-4.9,0-10.1,0-15.1c0-16.6-13.4-30-30-30H582.199c-16.6,0-30,13.4-30,30v14.5c0,15.5,11.801,28.4,27.201,29.9
        c14.5,1.4,29,3.5,43.299,6.3c30.201,5.9,44.9,22.7,44.9,53.3v374.9c0,22-2.5,45.399-7.301,69.5c-4.6,23.1-13.898,45-27.6,65
        c-14.299,20.1-34.199,36.899-59,49.899c-21.6,11.3-51.4,17.7-88.299,19.2c-37-1.4-66.7-7.9-88.3-19.2
        c-24.801-13-44.7-29.7-59-49.899c-13.7-20-23-41.9-27.601-65c-4.8-24.2-7.3-47.601-7.3-69.5v-375c0-30.5,14.7-47.3,44.9-53.3
        c14.3-2.8,28.699-4.9,43.3-6.3c15.399-1.5,27.2-14.4,27.2-29.9V30c0-16.6-13.4-30-30-30h-329c-16.6,0-30,13.4-30,30
        c0,5,0,10.2,0,15.1c0,14.7,10.7,27.3,25.2,29.6C73,77.6,94.9,81.8,98.3,83c27,9.8,44.2,27.4,44.2,57v408.6c0,34.4,7.4,67.9,22,99.5
        c14.6,31.601,36.5,60,65.2,84.4l0.1,0.1c28.8,24.2,64.8,43.601,106.9,57.7c41.8,14,90,21.101,143.2,21.101c1.7,0,3.5,0,5.399-0.101
        c2,0,3.701,0.101,5.4,0.101C543.9,811.4,592,804.3,633.9,790.3c42.1-14.1,78-33.5,106.898-57.7l0.102-0.1
        c28.699-24.4,50.6-52.8,65.199-84.4c14.6-31.6,22-65.1,22-99.5V140.1c0-29.6,17.301-47.2,44.199-57c3.4-1.2,25.301-5.4,43.5-8.3
        C930.299,72.4,940.9,59.8,940.9,45.1z"/>
  </g>
</svg>`;
const LINETHROUGH_ICON = `<svg id="linethrough-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 537.643 537.643">
  <defs>
    <style>#linethrough-icon .cls-1{stroke:currentColor;}</style>
  </defs>
  <g>
    <path class="cls-1" d="M399.768,239.341c-24.479-12.105-60.643-23.837-108.771-35.202c-51.035-12.051-83.17-23.624-96.402-34.731
      c-10.404-8.739-15.594-19.253-15.594-31.542c0-13.47,5.544-24.217,16.658-32.253c17.247-12.521,41.114-18.782,71.592-18.782
      c29.529,0,51.69,5.851,66.458,17.54c14.761,11.702,24.388,30.9,28.88,57.595l104.909-4.608
      c-1.658-47.724-18.96-85.882-51.928-114.475C382.62,14.296,333.525,0,268.316,0c-39.933,0-74.015,6.022-102.253,18.073
      c-28.231,12.05-49.847,29.59-64.848,52.632c-15.006,23.029-22.509,47.791-22.509,74.248c0,36.365,12.503,67.828,37.46,94.389
      H399.768L399.768,239.341z"/>
    <path class="cls-1" d="M351.775,427.592c-17.13,14.303-42.59,21.445-76.372,21.445c-31.897,0-57.234-8.029-76.029-24.102
      c-18.776-16.064-31.242-41.23-37.387-75.49l-102.069,9.928c6.848,58.121,27.876,102.369,63.085,132.725
      c35.202,30.361,85.643,45.545,151.335,45.545c45.129,0,82.81-6.322,113.061-18.961c30.239-12.643,53.63-31.951,70.172-57.949
      c16.536-25.986,24.811-53.869,24.811-83.643c0-22.582-3.348-42.619-9.884-60.232H306.529c9.97,2.766,17.467,5.012,22.388,6.713
      c17.95,6.377,30.538,13.881,37.742,22.504c7.209,8.629,10.813,19.088,10.813,31.371
      C377.473,396.582,368.911,413.297,351.775,427.592z"/>
    <path class="cls-1" d="M28.101,298.498h207.486h228.41h45.545c10.142,0,18.36-8.221,18.36-18.361v-4.082c0-10.141-8.219-18.36-18.36-18.36
      h-80.453H136.89H28.101c-10.141,0-18.36,8.219-18.36,18.36v4.082C9.74,290.277,17.959,298.498,28.101,298.498z"/>
  </g>
</svg>`;
const BUCKET_ICON = `<svg id="bucket-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.57 24.33">
  <defs>
    <style>
      #bucket-icon .cls-1{fill:none;stroke:currentColor;stroke-linecap:round;stroke-linejoin:round;stroke-width:2;}
      #bucket-icon .cls-2{fill:currentColor;}
    </style>
  </defs>
  <g>
    <g>
      <g>
        <g>
          <line class="cls-1" x1="11.99" y1="23.33" x2="22.57" y2="23.33"/>
          <line class="cls-1" x1="4.93" y1="1" x2="9.76" y2="5.83"/>
          <path class="cls-1" d="M19.36,11,11.17,19.2a3.25,3.25,0,0,1-4.61,0L2,14.6A3.25,3.25,0,0,1,2,10H2L10.14,1.8Z"/>
          <path class="cls-2" d="M3.09,8.85,19.36,11,11.17,19.2a3.25,3.25,0,0,1-4.61,0L2,14.6A3.25,3.25,0,0,1,2,10H2Z"/>
          <path class="cls-2" d="M22.06,18.11a2.36,2.36,0,0,1-4.67.63,2.22,2.22,0,0,1,0-.63c0-1,1.12-3,1.81-4.19a.59.59,0,0,1,.8-.25.55.55,0,0,1,.25.25c.69,1.14,1.81,3.18,1.81,4.2"/>
          </g>
        </g>
      </g>
    </g>
  </svg>`;

const UPLOAD_IMAGE_ICON = `<svg id="upload-image-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23.93 23.83">
  <defs>
    <style>#upload-image-icon .cls-1 {
      fill: #fff;
    }
    #upload-image-icon .cls-1, #upload-image-icon .cls-2, #upload-image-icon .cls-4 {
      stroke: currentColor;
      stroke-linejoin: round;
      stroke-width: 1.13;
    }
    #upload-image-icon .cls-2, .cls-3 {
      fill: currentColor;
    }
    #upload-image-icon .cls-4 {
      fill: none;
      stroke-linecap: round;
    }</style>
  </defs>
  <rect class="cls-1" x="0.57" y="3.77" width="19.5" height="19.5"/>
  <polyline class="cls-2" points="1.27 23.27 5.17 17.27 9.87 20.57 13.97 14.27 20.17 23.27"/>
  <circle class="cls-3" cx="7.87" cy="9.97" r="2.5"/>
  <circle class="cls-1" cx="17.97" cy="5.97" r="5.4"/>
  <polyline class="cls-4" points="17.97 8.47 17.97 3.47 15.57 6.37"/>
  <line class="cls-4" x1="17.97" y1="3.47" x2="20.37" y2="6.37"/>
</svg>`;

const BACKGROUND_ICON = `<svg id="background-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.88 21.88">
  <defs>
    <style>#background-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.5;
    }</style>
  </defs>
  <g>
    <line class="cls-1" x1="3.95" y1="16.51" x2="15.93" y2="16.51"/>
    <line class="cls-1" x1="3.95" y1="10.94" x2="15.93" y2="10.94"/>
    <line class="cls-1" x1="3.95" y1="5.37" x2="15.93" y2="5.37"/>
  </g>
  <rect class="cls-1" x=".75" y=".75" width="18.38" height="20.38"/>
</svg>`;

const BG_1_ICON = `<svg id="bg-1-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.57 21.77">
  <defs>
    <style>#bg-1-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.64;
    }</style>
  </defs>
  <line class="cls-1" x1=".82" y1="14.81" x2="18.75" y2="14.81"/>
  <line class="cls-1" x1=".82" y1="6.96" x2="18.75" y2="6.96"/>
  <line class="cls-1" x1="5.86" y1=".82" x2="5.86" y2="20.94"/>
  <line class="cls-1" x1="13.71" y1=".82" x2="13.71" y2="20.94"/>
</svg>`;
const BG_2_ICON = `<svg id="bg-2-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.57 12.96">
  <defs>
    <style>#bg-2-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.64;
    }</style>
  </defs>
  <line class="cls-1" x1=".82" y1="12.14" x2="18.75" y2="12.14"/>
  <line class="cls-1" x1=".82" y1=".82" x2="18.75" y2=".82"/>
  <line class="cls-1" x1=".82" y1="6.48" x2="18.75" y2="6.48"/>
</svg>`;
const BG_3_ICON = `<svg id="bg-3-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.57 16.93">
  <defs>
    <style>#bg-3-icon .cls-1 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.64;
    }</style>
  </defs>
  <line class="cls-1" x1=".82" y1="16.1" x2="18.75" y2="16.1"/>
  <line class="cls-1" x1=".82" y1="12.64" x2="18.75" y2="12.64"/>
  <line class="cls-1" x1=".82" y1="4.29" x2="18.75" y2="4.29"/>
  <line class="cls-1" x1=".82" y1=".82" x2="18.75" y2=".82"/>
</svg>`;
const BG_4_ICON = `<svg id="bg-4-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.57 20.94">
  <defs>
    <style>#bg-4-icon .cls-1 {
      stroke-width: .82;
    }
    #bg-4-icon .cls-1, #bg-4-icon .cls-2 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    #bg-4-icon .cls-2 {
      stroke-width: 1.64;
    }</style>
  </defs>
  <line class="cls-2" x1=".82" y1="18.32" x2="18.75" y2="18.32"/>
  <line class="cls-2" x1=".82" y1="14.86" x2="18.75" y2="14.86"/>
  <line class="cls-2" x1=".82" y1="6.51" x2="18.75" y2="6.51"/>
  <line class="cls-2" x1=".82" y1="3.04" x2="18.75" y2="3.04"/>
  <line class="cls-1" x1="15.39" y1=".41" x2="5.23" y2="20.53"/>
</svg>`;
const BG_5_ICON = `<svg id="bg-5-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.57 16.93">
  <defs>
    <style>#bg-5-icon .cls-1, #bg-5-icon .cls-2 {
      stroke-width: .55;
    }
    #bg-5-icon .cls-1, #bg-5-icon .cls-2, #bg-5-icon .cls-3 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    #bg-5-icon .cls-2 {
      stroke-dasharray: 0 0 0 0 0 0 2.25 2.25;
    }
    #bg-5-icon .cls-3 {
      stroke-width: 1.64;
    }</style>
  </defs>
  <line class="cls-3" x1=".82" y1="16.1" x2="18.75" y2="16.1"/>
  <line class="cls-3" x1=".82" y1="12.64" x2="18.75" y2="12.64"/>
  <line class="cls-3" x1=".82" y1="4.29" x2="18.75" y2="4.29"/>
  <g>
    <line class="cls-1" x1=".82" y1="8.46" x2="1.92" y2="8.46"/>
    <line class="cls-2" x1="4.17" y1="8.46" x2="16.53" y2="8.46"/>
    <line class="cls-1" x1="17.66" y1="8.46" x2="18.75" y2="8.46"/>
  </g>
  <line class="cls-3" x1=".82" y1=".82" x2="18.75" y2=".82"/>
</svg>`;
const BG_6_ICON = `<svg id="bg-6-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.57 20.46">
  <defs>
    <style>#bg-6-icon .cls-1 {
      fill: currentColor;
    }
    #bg-6-icon .cls-2 {
      fill: none;
      stroke: currentColor;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1.64;
    }</style>
  </defs>
  <line class="cls-2" x1=".82" y1="16.21" x2="18.75" y2="16.21"/>
  <line class="cls-2" x1=".82" y1="19.63" x2="18.75" y2="19.63"/>
  <ellipse class="cls-1" cx="9.24" cy="10.77" rx="3.66" ry="3.04" transform="translate(-2.09 2.23) rotate(-12.35)"/>
  <polyline class="cls-2" points="15.99 3.82 12.07 .82 12.07 10.54"/>
</svg>`;

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
  iconRegistry.addSvgIconLiteral('bold', sanitizer.bypassSecurityTrustHtml(BOLD_ICON));
  iconRegistry.addSvgIconLiteral('italic', sanitizer.bypassSecurityTrustHtml(ITALIC_ICON));
  iconRegistry.addSvgIconLiteral('underline', sanitizer.bypassSecurityTrustHtml(UNDERLINE_ICON));
  iconRegistry.addSvgIconLiteral('linethrough', sanitizer.bypassSecurityTrustHtml(LINETHROUGH_ICON));
  iconRegistry.addSvgIconLiteral('bucket', sanitizer.bypassSecurityTrustHtml(BUCKET_ICON));
  iconRegistry.addSvgIconLiteral('upload-image', sanitizer.bypassSecurityTrustHtml(UPLOAD_IMAGE_ICON));
  iconRegistry.addSvgIconLiteral('background', sanitizer.bypassSecurityTrustHtml(BACKGROUND_ICON));
  iconRegistry.addSvgIconLiteral('bg-1', sanitizer.bypassSecurityTrustHtml(BG_1_ICON));
  iconRegistry.addSvgIconLiteral('bg-2', sanitizer.bypassSecurityTrustHtml(BG_2_ICON));
  iconRegistry.addSvgIconLiteral('bg-3', sanitizer.bypassSecurityTrustHtml(BG_3_ICON));
  iconRegistry.addSvgIconLiteral('bg-4', sanitizer.bypassSecurityTrustHtml(BG_4_ICON));
  iconRegistry.addSvgIconLiteral('bg-5', sanitizer.bypassSecurityTrustHtml(BG_5_ICON));
  iconRegistry.addSvgIconLiteral('bg-6', sanitizer.bypassSecurityTrustHtml(BG_6_ICON));
}
