import { html } from 'lit-element';

export const thinBorderBottom = html`
<style>
  .thinBorderBottom {
      border: none;
      outline: none;
      border-bottom: thin;
      border-bottom-style: solid;
    }
</style>
`;

export const noBorders = html`
<style>
  .noBorders {
      border: none;
      outline: none;
      background-color: transparent;
    }
</style>
`;

export const alignItemsVerticalCenter = html`
<style>
  .alignItemsVerticalCenter {
    display: flex; 
    align-items: center; 
    gap: 1rem;
    padding: 0.5rem; 
    background-color: transparent;
  }
</style>
`;

export const hoover = html`
<style>
  .hoover:hover {
    background-color: var(--vt-c-text-dark-2);
  }
</style>
`;