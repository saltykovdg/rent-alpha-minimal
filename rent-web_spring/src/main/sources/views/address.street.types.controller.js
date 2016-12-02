export default ($scope, $timeout, addressService) => {
    var vm = $scope;
    var editForm = null;
    var editFormModal = null;

    vm.streetTypeDtos = [];
    vm.streetTypeDtos.push({
        id: 1,
        name: 'улица',
        nameShort: 'ул.'
    });
    vm.streetTypeDtos.push({
        id: 2,
        name: 'бульвар',
        nameShort: 'б-р.'
    });

    var save = () => {
        if (editForm.form('validate form')) {
            console.log('saved successfully');
            return true;
        } else {
            return false;
        }
    };

    vm.edit = (streetTypeDto) => {
        vm.editForm = {};
        editFormModal.modal('show');
        $timeout(() => {
            if (streetTypeDto) {
                vm.editForm.id = streetTypeDto.id;
                vm.editForm.name = streetTypeDto.name;
                vm.editForm.nameShort = streetTypeDto.nameShort;
            }
        }, 0, true);
    };
    vm.delete = (id) => {
        console.log('deleted: ' + id);
    };

    $timeout(() => {
        editForm = $('[name=content] form');
        editForm.submit(() => {
            return false;
        });
        editForm.form({
            on: 'blur',
            fields: {
                'editForm.name': {
                    identifier: 'editForm.name',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Поле "Тип улицы" не должно быть пустым!'
                        }
                    ]
                },
                'editForm.nameShort': {
                    identifier: 'editForm.nameShort',
                    rules: [
                        {
                            type: 'empty',
                            prompt: 'Поле "Тип улицы кратко" не должно быть пустым!'
                        }
                    ]
                }
            }
        });
        editFormModal = $('[name=content] .ui.modal');
        editFormModal.modal({
            closable: false,
            onHidden: () => {
                editForm.form('clear errors');
                editForm.find('.error').empty();
                $timeout(() => {
                    vm.editForm = {};
                }, 0, true);
            },
            onDeny: () => {
                return true;
            },
            onApprove: () => {
                return save();
            }
        })
    }, 0, false)
}
