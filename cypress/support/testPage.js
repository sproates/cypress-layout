export const testPage = `
<div class="one"></div>
<div class="two"></div>
<div class="three"></div>
<div class="four"></div>
<div class="five">
  <div class="fourteen"></div>
</div>
<div class="six"></div>
<div class="seven"></div>
<div class="eight"></div>
<div class="nine"></div>
<div class="ten"></div>
<div class="eleven"></div>
<div class="twelve"></div>
<div class="thirteen"></div>
<div class="fifteen"></div>
<div class="sixteen"></div>
<div class="seventeen"></div>
<div class="eighteen"></div>
<div class="nineteen"></div>
<div class="twenty"></div>
<style>
  body {
    margin: 0px;
  }

  .one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .ten, .eleven, .twelve, .thirteen, .fourteen, .fifteen, .sixteen, .seventeen, .eighteen {
    position: absolute;

  }

  .one, .two, .three, .four, .five, .six, .seven, .eight, .nine {
    background: rgba(187,25,25);
    width: 400px;
    height: 400px;
  }

  .ten, .eleven, .twelve, .thirteen, .fourteen, .fifteen, .sixteen, .seventeen, .eighteen {
    background: rgba(255,255,255);
    width: 200px;
    height: 200px;
  }

  .one {  }
  .two { left: 500px; }
  .three { left: 1000px; }
  .four { top: 500px; }
  .five { top: 500px; left: 500px; }
  .six { top: 500px; left: 1000px; }
  .seven { top: 1000px; }
  .eight { top: 1000px; left: 500px; }
  .nine { top: 1000px; left: 1000px; }

  .ten { top: 100px; left: 100px;  }
  .eleven { top: 100px; left: 600px; }
  .twelve { top: 100px; left: 1100px; }
  .thirteen { top: 600px; left: 100px; }
  .fourteen { top: 100px; left: 100px; }
  .fifteen { top: 600px; left: 1100px; }
  .sixteen { top: 1100px; left: 100px }
  .seventeen { top: 1100px; left: 600px }
  .eighteen { top: 1100px; left: 1100px; }
  }
</style>
`
;