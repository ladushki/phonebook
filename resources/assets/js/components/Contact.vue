<template>
    <div>
        <button id="new" @click="addContact()"  v-if="!showForm">+ Add new contact</button>
        <cform v-if="showForm"
               :contact="contact"
               :userId="user"
               :errors="errors"
               @submitted="submit(contact)"
               @canceled="cancel()"></cform>
        <div v-if="!showForm">
            <ul v-if="contacts.length" class="list-group contacts">
                <li v-for="(item, index) in contacts" class="list-group-item">
                    <h4 class="list-group-item-heading"><span class="badge">{{ index + 1 }}</span> {{ item.first_name
                        }} {{ item.last_name }} {{ item.phone }}
                        <input type="button" class="" value="e" @click="updateContact(item)">
                        <input type="button" class="" value="x" @click="deleteContact(item.id)"></h4>
                    <p class="list-group-item-text"></p>
                </li>
            </ul>
            <p v-else>No contacts found.</p>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.fetchData();
        },
        props: {
            user: {
                required: true
            },
        },
        data() {
            return {
                contacts: [],
                showForm: false,
                errors: {},
                contact: {
                    id: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    created_by: this.user,
                    updated_by: this.user,
                }
            }
        },
        watch: {
            'search'(newValue, oldValue) {
                this.setFilter()
            },
        },

        methods: {
            fetchData(){
                axios.get('/api/contacts')
                    .then(function (response) {
                       this.contacts = response.data;
                    }.bind( this ))
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            cancel (){
                this.resetForm();
            },
            addContact(){
                this.showForm = true;
            },
            resetForm() {
                this.showForm = false;
                this.contact = {
                    id: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    created_by: this.user,
                    updated_by: this.user,
                }
            },
            updateContact (contact){
                this.showForm = true;
                this.contact = contact;
            },

            submit (formData) {
                let url = 'api/contacts/store';

                if (formData.id >0)  url = 'api/contacts/update/'+formData.id;
                axios.post(url, formData)
                    .then(response => {
                        this.fetchData();
                        this.resetForm();
                    }).catch(error => {
                    this.errors = error.response.data;
                    swal(
                        'Error',
                        'Failed to add a contact.',
                        'error'
                    );


                });
            },
            deleteContact (id){
                swal({
                    title: 'Confirmation',
                    text: 'Are you sure you want to delete this data?',
                    type: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    showLoaderOnConfirm: true
                }).then(() => {
                    swal.disableButtons();

                    let formData = new FormData();

                    formData.set('_method', 'DELETE');

                    let url = '/api/contacts/' + id;

                    axios.post(url, formData)
                        .then(response => {
                            swal(
                                'Success',
                                'Your data has been deleted.',
                                'success'
                            );

                            this.fetchData();
                        }).catch(response => {
                        swal(
                            'Error',
                            'Failed to delete your data.',
                            'error'
                        );
                    });
                })
            }
        }
    }
</script>