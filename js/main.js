/**
 * SafePaw - Main JavaScript
 * 包含：导航高亮、滚动进入动画、志愿者表单处理
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. 导航栏自动高亮逻辑 ---
    // 获取当前文件名 (例如: volunteer.html)
    let currentPage = window.location.pathname.split("/").pop();
    if (currentPage === "" || currentPage === "index") {
        currentPage = "index.html";
    }

    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        // 如果链接的 href 属性与当前页面名匹配，则添加 active 类
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // --- 2. 滚动进入动画 (Fade-in) ---
    const fadeElements = document.querySelectorAll(".fade-in");
    
    const appearanceOptions = {
        threshold: 0.15, // 元素出现 15% 时触发
        rootMargin: "0px 0px -50px 0px"
    };

    const appearanceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                // 一旦显示后，就不再需要观察，提升性能
                appearanceObserver.unobserve(entry.target);
            }
        });
    }, appearanceOptions);

    fadeElements.forEach(el => {
        appearanceObserver.observe(el);
    });

    // --- 3. 志愿者表单提交处理 ---
    const vForm = document.getElementById("volunteerForm");
    if (vForm) {
        vForm.addEventListener("submit", (e) => {
            e.preventDefault(); // 阻止页面刷新

            // 提取数据
            const name = vForm.querySelector('input[type="text"]').value;
            const email = vForm.querySelector('input[type="email"]').value;
            const role = vForm.querySelector('select').value;

            // 模拟提交反馈
            // 使用反引号 (Backticks) 来实现动态字符串
            const successMsg = `Thank you, ${name}!\n\nYour application for the "${role}" role has been received. We will send a confirmation to ${email} within 48 hours.\n\n🐾 Together, we make a difference!`;
            
            alert(successMsg);
            
            // 重置表单
            vForm.reset();
        });
    }
});

// --- 4. 针对 Emotion 页面的小功能 ---
function showResult() {
    const q2 = document.getElementById("q2")?.value;
    const resultDisplay = document.getElementById("resultDisplay");
    
    if (resultDisplay && q2) {
        if (q2 === "Yes") {
            resultDisplay.textContent = "❤️ 93% of our community agrees with you!";
            resultDisplay.style.color = "#E76F51";
        } else {
            resultDisplay.textContent = "💬 Thank you for your perspective!";
            resultDisplay.style.color = "#333";
        }
    }
}