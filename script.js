const canvas = document.getElementById("canva");
const context = canvas.getContext("2d");

const frames = {
    currentIndex: 0,  // Índice inicial do quadro
    maxIndex: 538,    // Número total de quadros
};

const images = [];  // Armazena as imagens pré-carregadas
let imagesLoaded = 0;  // Contador de imagens carregadas

// Pré-carrega todas as imagens necessárias
function preloadImages() {
    for (let i = 1; i <= frames.maxIndex; i++) {
        const imageUrl = `./img/frames/frame_${i.toString().padStart(4, "0")}.jpg`;
        const img = new Image();
        img.src = imageUrl;

        // Incrementa o contador quando a imagem é carregada
        img.onload = () => {
            imagesLoaded++;

            // Inicia a animação quando todas as imagens estiverem carregadas
            if (imagesLoaded === frames.maxIndex) {
                loadImage(frames.currentIndex);
                startAnimation();
            }
        };

        images.push(img);
    }
}

// Desenha a imagem correspondente ao índice no canvas
function loadImage(index) {
    if (index >= 0 && index <= frames.maxIndex) {
        const img = images[index];

        // Ajusta o tamanho do canvas para preencher a janela
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Calcula a escala para ajustar a imagem ao tamanho do canvas
        const scaleX = canvas.width / img.width;
        const scaleY = canvas.height / img.height;
        const scale = Math.max(scaleX, scaleY);

        // Calcula o deslocamento para centralizar a imagem no canvas
        const newWidth = img.width * scale;
        const newHeight = img.height * scale;
        const offsetX = (canvas.width - newWidth) / 2;
        const offsetY = (canvas.height - newHeight) / 2;

        // Limpa o canvas e desenha a nova imagem
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
        context.drawImage(img, offsetX, offsetY, newWidth, newHeight);

        frames.currentIndex = index;
    }
}

// Configura e inicia a animação sincronizada com o scroll
function startAnimation() {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.parent',
            start: "top top",
            scrub: 2,
            end: "bottom bottom"
        }
    });

    function updateFrame(index) {
        return {
            currentIndex: index,
            ease: "linear",
            onUpdate: () => loadImage(Math.floor(frames.currentIndex))
        };
    }

    tl.to(frames, updateFrame(50), "first")
      .to(".animate1", { opacity: 0, ease: "linear" }, "first")

      .to(frames, updateFrame(80), "second")
      .to(".animate2", { opacity: 1, ease: "linear" }, "second")

      .to(frames, updateFrame(110), "third")
      .to(".animate2", { opacity: 1, ease: "linear" }, "third")

      .to(frames, updateFrame(140), "fourth")
      .to(".animate2", { opacity: 0, ease: "linear" }, "fourth")

      .to(frames, updateFrame(170), "fifth")
      .to(".animate3", { opacity: 1, ease: "linear" }, "fifth")

      .to(frames, updateFrame(200), "sixth")
      .to(".animate3", { opacity: 1, ease: "linear" }, "sixth")

      .to(frames, updateFrame(230), "seventh")
      .to(".animate3", { opacity: 0, ease: "linear" }, "seventh")

      .to(frames, updateFrame(260), "eighth")
      .to(".panel", { x: "0%", ease: "expo" }, "eighth")

      .to(frames, updateFrame(290), "ninth")
      .to(".panel", { x: "0%", ease: "expo" }, "ninth")

      .to(frames, updateFrame(320), "tenth")
      .to(".panel", { opacity: 0, ease: "linear" }, "tenth")

      .to(frames, updateFrame(350), "eleventh")
      .to("canvas", { scale: 0.6, ease: "linear" }, "eleventh")

      .to(frames, updateFrame(380), "twelfth")
      .to(".panelism", { opacity: 1, ease: "expo" }, "twelfth")

      .to(frames, updateFrame(410), "twelfth")
      .to(".panelism span", { width: 200, ease: "expo" }, "twelfth")

      .to(frames, updateFrame(440), "thirteenth")
      .to("canvas", { scale: 1, ease: "linear" }, "thirteenth")

      .to(frames, updateFrame(480), "fourteenth")
      .to("canvas", { scale: 2, ease: 'circ' }, "fourteenth")

      .to(frames, updateFrame(530), "fifteenth")
      .to("canvas", { scale: 2, ease: 'circ' }, "fifteenth");
}

// Sincroniza a animação do lenis com o ticker do GSAP
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

// Desativa a suavização de lag do GSAP
gsap.ticker.lagSmoothing(0);

// Inicia o pré-carregamento das imagens
preloadImages();

// Atualiza a imagem ao redimensionar a janela
window.addEventListener("resize", () => {
    loadImage(Math.floor(frames.currentIndex));
});

// Anima os cabeçalhos à medida que aparecem na tela
document.querySelectorAll(".headings h3").forEach((elem) => {
    gsap.from(elem, {
        scrollTrigger: {
            trigger: elem,
            start: "top 90%",
            end: "bottom 20%",
            scrub: 2
        },
        opacity: 0.3
    });
});
