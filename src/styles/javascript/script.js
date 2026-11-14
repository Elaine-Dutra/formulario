const form = document.querySelector('#form');

// CAMPOS QUE SERÃO VALIDADOS
const fields = [
    'name',
    'last_name',
    'email',
    'password',
    'confirm_password'
];

const errorIcon = '<i class="fa-solid fa-circle-exclamation"></i>';

let formWasSubmitted = false;


// VERIFICAR SE O CAMPO ESTÁ VAZIO

function isEmpty(value) {
    return value.trim() === '';
}


// VALIDAR CADA CAMPO

function validateField(fieldId) {

    const input = document.querySelector(`#${fieldId}`);
    const inputBox = input.closest('.input-box');
    const errorSpan = inputBox.querySelector('.error');

    const value = input.value;

    let errorMessage = '';

    if (isEmpty(value)) {
    errorMessage = 'O campo é obrigatório';
}

// Verificar quantidade mínima de caracteres
else if (
    (fieldId === 'name' || fieldId === 'last_name') &&
    value.trim().length < 3
) {
    errorMessage = 'Digite pelo menos 3 caracteres';
}

    // Verificar e-mail
    else if (fieldId === 'email' && !input.validity.valid) {
        errorMessage = 'Digite um e-mail válido';
    }

    // Verificar se as senhas são iguais
    else if (
        fieldId === 'confirm_password' &&
        value !== document.querySelector('#password').value
    ) {
        errorMessage = 'As senhas não são iguais';
    }

    // Remover classes anteriores
    inputBox.classList.remove('valid', 'invalid');

    // Limpar mensagem anterior
    errorSpan.innerHTML = '';

    // Se houver erro
    if (errorMessage !== '') {

        inputBox.classList.add('invalid');

        errorSpan.innerHTML = `${errorIcon} ${errorMessage}`;

        return false;
    }

    // Se estiver correto
    inputBox.classList.add('valid');

    return true;
}


// VALIDAR GÊNERO

function validateGender() {

    const genderContainer = document.querySelector('.radio-container');

    const errorSpan = genderContainer.querySelector('.error');

    const selectedGender = document.querySelector(
        'input[name="gender"]:checked'
    );

    genderContainer.classList.remove('valid', 'invalid');

    errorSpan.innerHTML = '';

    if (!selectedGender) {

        genderContainer.classList.add('invalid');

        errorSpan.innerHTML =
            `${errorIcon} Selecione uma opção`;

        return false;
    }

    genderContainer.classList.add('valid');

    return true;
}


// VALIDAR FORMULÁRIO COMPLETO

function validateForm() {

    let formIsValid = true;

    fields.forEach(function(fieldId) {

        const fieldIsValid = validateField(fieldId);

        if (!fieldIsValid) {
            formIsValid = false;
        }

    });

    const genderIsValid = validateGender();

    if (!genderIsValid) {
        formIsValid = false;
    }

    return formIsValid;
}


// ENVIAR FORMULÁRIO

form.addEventListener('submit', function(e) {

    e.preventDefault();

    formWasSubmitted = true;

    const formIsValid = validateForm();

    if (formIsValid) {

        alert('Formulário preenchido corretamente!');

    }

});


// VALIDAR ENQUANTO DIGITA

fields.forEach(function(fieldId) {

    const input = document.querySelector(`#${fieldId}`);

    input.addEventListener('input', function() {

        if (formWasSubmitted) {

            validateField(fieldId);

            // Se a senha mudar, verificar também a confirmação
            if (fieldId === 'password') {
                validateField('confirm_password');
            }

        }

    });

});


// VALIDAR GÊNERO AO SELECIONAR

const genderInputs = document.querySelectorAll(
    'input[name="gender"]'
);

genderInputs.forEach(function(input) {

    input.addEventListener('change', function() {

        if (formWasSubmitted) {
            validateGender();
        }

    });

});


// MOSTRAR E ESCONDER SENHA

const passwordIcons = document.querySelectorAll('.password-icon');

passwordIcons.forEach(function(icon) {

    icon.addEventListener('click', function() {

        const input = this.parentElement.querySelector('input');

        if (input.type === 'password') {

            input.type = 'text';

            this.classList.remove('fa-eye-slash');
            this.classList.add('fa-eye');

        } else {

            input.type = 'password';

            this.classList.remove('fa-eye');
            this.classList.add('fa-eye-slash');

        }

    });

});


// NAVEGAR PELOS CAMPOS COM ENTER

const enterOrder = [
    'name',
    'last_name',
    'birthdate',
    'email',
    'password',
    'confirm_password',
    'female',
    'submit_button'
];

form.addEventListener('keydown', function(e) {

    if (e.key !== 'Enter') {
        return;
    }

    // Permitir que o botão envie o formulário normalmente
    if (e.target.id === 'submit_button') {
        return;
    }

    // Impedir o envio automático ao apertar Enter nos campos
    e.preventDefault();

    let currentId = e.target.id;

    // Qualquer opção de gênero leva ao botão de enviar
    if (e.target.type === 'radio') {
        currentId = 'female';
    }

    const currentIndex = enterOrder.indexOf(currentId);

    const nextId = enterOrder[currentIndex + 1];

    if (nextId) {

        document.querySelector(`#${nextId}`).focus();

    }

});















