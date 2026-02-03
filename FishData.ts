
export const FISH_ASSETS = {
  "meta": {
    "unit": "px",
    "grid": 16,
    "shapeRendering": "crispEdges",
    "style": "flat-skeleton"
  },
  "palettes": {
    "mono-white": { "bone": "#FFFFFF", "outline": "#000000", "eye": "#000000" },
    "mono-black": { "bone": "#000000", "outline": "#FFFFFF", "eye": "#FFFFFF" }
  },
  "sprites": {
    "fish-xs": {
      "render": (p: any) => `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' width='16' height='16' shape-rendering='crispEdges'>
          <rect x='11' y='6' width='3' height='4' fill='${p.bone}' stroke='${p.outline}' stroke-width='0.5'/>
          <rect x='3' y='7.5' width='8' height='1' fill='${p.bone}'/>
          <rect x='4' y='6' width='1' height='4' fill='${p.bone}'/>
          <rect x='6' y='6' width='1' height='4' fill='${p.bone}'/>
          <rect x='8' y='6' width='1' height='4' fill='${p.bone}'/>
          <rect x='1' y='5' width='1' height='6' fill='${p.bone}' stroke='${p.outline}' stroke-width='0.5'/>
          <rect x='12' y='7' width='1' height='1' fill='${p.eye}' class='eye'/>
        </svg>`
    },
    "fish-sm": {
      "render": (p: any) => `
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' shape-rendering='crispEdges'>
          <rect x='17' y='8' width='5' height='8' fill='${p.bone}' stroke='${p.outline}' stroke-width='0.5'/>
          <rect x='4' y='11.5' width='13' height='1' fill='${p.bone}'/>
          <rect x='6' y='7' width='1' height='10' fill='${p.bone}'/>
          <rect x='9' y='7' width='1' height='10' fill='${p.bone}'/>
          <rect x='12' y='7' width='1' height='10' fill='${p.bone}'/>
          <rect x='15' y='7' width='1' height='10' fill='${p.bone}'/>
          <rect x='1' y='7' width='2' height='10' fill='${p.bone}' stroke='${p.outline}' stroke-width='0.5'/>
          <rect x='19' y='10' width='1.5' height='1.5' fill='${p.eye}' class='eye'/>
        </svg>`
    }
  }
};
