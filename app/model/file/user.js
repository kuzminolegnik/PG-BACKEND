module.exports = function () {

    const app = this;
    const ModelFile = app.getModel('base.file');

    return new ModelFile({
        entityName: 'users'
    });

};