const questions = [
    'Saya merasa tidak yakin bahwa saya mampu untuk menyelesaikan tugas tersebut, karena saya tahu tugasnya akan lebih sulit.',
    'Ketika menghadapi tugas baru, saya mengingat cara menyelesaikan tugas serupa di masa lalu.',
    'Saya mampu mengadaptasi metode yang sudah saya kuasai untuk mengerjakan tugas baru.',
    'Saya kesulitan menggunakan pengalaman masa lalu untuk membantu menyelesaikan tugas baru.',
    'Saya tidak bisa memanfaatkan metode yang sudah saya kuasai dari tugas sebelumnya untuk tugas yang baru.',
    'Semakin sulit tugas yang diberikan, maka semakin membuat saya bingung.',
    'Saya merasa yakin dapat menyelesaikan tugas yang sulit dengan baik.',
    'Saya yakin bahwa usaha dan keterampilan yang saya miliki dapat menyelesaikan tugas dengan sukses.',
    'Saya yakin dapat menghadapi berbagai tantangan dengan kemampuan saya.',
    'Ketika saya mengalami hambatan dalam menyelesaikan tugas, saya akan mudah menyerah.',
    'Saya merasa khawatir jika IPK saya menurun karena tugas yang tidak maksimal.',
    'Saya bisa bangkit dari kegagalan dalam perkuliahan.',
    'Saya terus berusaha untuk mencapai nilai bagus, meskipun pernah gagal sebelumnya.',
    'Saya mudah kehilangan semangat ketika menghadapi tugas project besar dalam mencapai tujuan saya.',
    'Jika mengalami kegagalan dalam tugas, saya merasa sulit untuk bangkit dan mencoba lagi.',
    'Saya merasa yakin dapat mengerti setiap materi mata kuliah yang sulit.',
    'Saya yakin dapat menyelesaikan tugas atau projek kuliah yang sulit.',
    'Saya yakin dapat menyelesaikan tugas-tugas dengan usaha saya sendiri.',
    'Saya tidak percaya dengan kemampuan diri saya untuk mengerjakan tugas atau projek yang sulit.',
    'Saya kurang yakin dengan diri saya untuk memahami mata kuliah yang saya anggap sulit.',
    'Saya yakin tetap mampu mengerjakan tugas dengan tekun meskipun batas waktu pengerjaan yang singkat.',
    'Saya yakin dapat bertahan ketika banyak tugas yang harus dikerjakan',
    'Meskipun saya dihadapkan dengan banyak tekanan saat kuliah, saya yakin mampu memperoleh nilai yang tinggi atas apa yang saya kerjakan.',
    'Saya kurang disiplin dalam mengerjakan tugas karena saya merasa yang penting tugas tersebut selesai.',
    'Saya ragu pada hasil tugas saya jika dikerjakan seorang diri.',
    'Saya tidak yakin bahwa usaha yang saya lakukan dapat menyelesaikan tugas saya.',
    'Saya menganggap kegagalan yang saya alami karena ketidakmampuan diri saya.',
    'Saya merasa yakin ketika mengerjakan tugas-tugas kuliah yang serupa dengan sebelumnya.',
    'Karena saya pernah menyelesaikan tugas sebelumnya, saya merasa yakin ketika tugas tersebut menjadi lebih sulit.',
    'Saya merasa tidak yakin tugas saya akan selesai dengan cepat, karena saya mengerjakan tugas dengan cara yang sama seperti sebelumnya.',
];

const mean = 75.61;
const sd = 10.861;

let currentQuestion = 0;

function calculateCategory(score) {
    if (score <= mean - sd) return 'Rendah';
    if (score > mean + sd) return 'Tinggi';
    return 'Sedang';
}

function showQuestionnaire() {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('questionnaire-section').classList.remove('hidden');
}

function showAboutPage() {
    document.getElementById('main-content').classList.add('hidden');
    document.getElementById('about-page').classList.remove('hidden');
}

function showMainPage() {
    document.getElementById('main-content').classList.remove('hidden');
    document.getElementById('about-page').classList.add('hidden');
    document.getElementById('questionnaire-section').classList.add('hidden');
}

function proceedToQuestionnaire() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;

    if (!name || !email || !age || !gender) {
        alert('Mohon lengkapi semua data diri sebelum melanjutkan.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Mohon masukkan alamat email yang valid.');
        return;
    }

    const ageNum = parseInt(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 150) {
        alert('Mohon masukkan usia yang valid.');
        return;
    }

    document.getElementById('userForm').classList.add('hidden');
    document.getElementById('questionnaireForm').classList.remove('hidden');

    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    questions.forEach((question, index) => {
        const slideDiv = document.createElement('div');
        slideDiv.className = `question-slide ${index === 0 ? 'active' : ''}`;
        slideDiv.innerHTML = `
            <div class="form-section">
                <p>${index + 1}. ${question}</p>
                <div class="side-labels">
                    <span>Sangat Tidak Setuju</span>
                    <span>Sangat Setuju</span>
                </div>
                <div class="radio-group">
                    ${[1, 2, 3, 4]
                      .map(
                        (value) => `
                            <div class="radio-container">
                                <span class="scale-label">${value}</span>
                                <input type="radio" name="q${index + 1}" value="${value}" required 
                                    onchange="handleAnswerSelection(${index})">
                            </div>
                        `
                      )
                      .join('')}
                </div>
            </div>
        `;
        questionContainer.appendChild(slideDiv);
    });

    updateProgress();
}

function handleAnswerSelection(questionIndex) {
    if (questionIndex < questions.length - 1) {
        setTimeout(() => {
            showQuestion(questionIndex + 1);
        }, 300);
    } else {
        document.getElementById('submitButton').classList.remove('hidden');
    }
}

function showQuestion(index) {
    const allQuestions = document.querySelectorAll('.question-slide');
    allQuestions.forEach((q) => q.classList.remove('active'));
    allQuestions[index].classList.add('active');
    currentQuestion = index;
    updateProgress();

    const prevButton = document.getElementById('prevButton');
    prevButton.classList.toggle('hidden', index === 0);
}

function showPrevQuestion() {
    if (currentQuestion > 0) {
        showQuestion(currentQuestion - 1);
        document.getElementById('submitButton').classList.add('hidden');
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const questionCounter = document.getElementById('questionCounter');
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    questionCounter.textContent = `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;
}

function submitQuestionnaire() {
    const totalQuestions = questions.length;
    let allAnswered = true;

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
    };

    const responses = [];
    for (let i = 1; i <= totalQuestions; i++) {
        const selectedOption = document.querySelector(`input[name="q${i}"]:checked`);
        if (!selectedOption) {
            allAnswered = false;
            break;
        }
        responses.push(parseInt(selectedOption.value));
    }

    if (!allAnswered) {
        alert('Harap isi semua pertanyaan sebelum mengirim kuisioner.');
        return;
    }

    // Calculate total score manually (since no backend is provided)
    const totalScore = responses.reduce((sum, response) => sum + response, 0);
    const category = calculateCategory(totalScore);

    // Display result directly without fetch
    document.getElementById('questionnaireForm').classList.add('hidden');
    document.getElementById('resultPage').classList.remove('hidden');
    
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="score">
            <p><strong>Nama:</strong> ${userData.name}</p>
            <p><strong>Email:</strong> ${userData.email}</p>
            <p><strong>Usia:</strong> ${userData.age}</p>
            <p><strong>Jenis Kelamin:</strong> ${userData.gender}</p>
            <p><strong>Total Skor:</strong> ${totalScore}</p>
        </div>
        <div class="kategori">Kategori Self-Efficacy: ${category}</div>
        <div class="interpretation">
            <h3>Interpretasi Kategori:</h3>
            <ul>
                <li>Rendah: Skor ≤ 65</li>
                <li>Sedang: 65 < Skor ≤ 86</li>
                <li>Tinggi: Skor > 86</li>
            </ul>
        </div>
    `;
}

function backToQuestionnaire() {
    document.getElementById('resultPage').classList.add('hidden');
    document.getElementById('userForm').classList.remove('hidden');
    document.getElementById('userForm').reset();
    document.getElementById('selfEfficacyForm').reset();
    currentQuestion = 0;
    updateProgress();
}