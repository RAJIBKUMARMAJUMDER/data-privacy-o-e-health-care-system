const doctor = "doc";
const nurse = "nur";
const patient = "pat";
const pharmacist = "phar";
const pathalogist = "path";

function rand_num() {
    let id_num = Math.floor(Math.random() * 100000);
    return id_num;
}

function doctor_id() {
    let doctor_id = doctor.concat(rand_num());
    return doctor_id;
}

function nurse_id() {
    let nurse_id = nurse.concat(rand_num());
    return nurse_id;
}

function patient_id() {
    let patient_id = patient.concat(rand_num());
    return patient_id;
}

function pharmacist_id() {
    let pharmacist_id = pharmacist.concat(rand_num());
    return pharmacist_id;
}

function pathalogist_id() {
    let pathalogist_id = pathalogist.concat(rand_num());
    return pathalogist_id;
}
