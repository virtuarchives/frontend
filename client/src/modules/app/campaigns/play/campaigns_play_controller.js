const campaignsPlayController = function campaignsPlayControllerFunction ($localStorage, $mdSidenav, $scope, $state, $timeout, Api, Campaign, FormService) {
  'ngInject'

  const vm = this

  vm.campaign = new Campaign($state.params.id)

  vm.username = $localStorage.account.username

  vm.closePanel = () => {
    $mdSidenav('play-sidenav').close()
  }

  vm.openPanel = (panelType) => {
    if (!$mdSidenav('play-sidenav').isOpen()) {
      $mdSidenav('play-sidenav').toggle()
    }
    vm.displayedPanel = panelType
    vm.panelURL = `/client/src/modules/app/campaigns/play/panels/${panelType}.html`
    if (panelType == 'chatroom') {
      vm.scrollMessages()
    }
  }

  vm.sendMessage = () => vm.campaign.addMessage(vm.message)

  vm.scrollMessages = () => {
    $timeout(() => {
      const element = $('.md-chatroom-content')[0]
      element.scrollTop = element.scrollHeight
    }, 100)
  }

  vm.getTotal = (message) => {
    return _.sum(message.data.results) + message.data.modifier
  }

  vm.isCreator = () => {
    return _.get(vm, 'campaign.creator.username') == vm.username
  }

  vm.openUploadModal = () => {
    $rootScope.$broadcast('modals.upload.open')
  }

  $scope.$on('message.created', (event, message) => {
    if (message.campaign_id === $state.params.id) {
      FormService.reset(vm.sendMessageForm)
      vm.campaign.insertMessage(message)
      vm.message = ''
      vm.scrollMessages()
    }
  })

  $scope.$on('command.failed', (event, error) => {
    FormService.reset(vm.sendMessageForm)
    vm.sendMessageForm.message.$setValidity(error.data.field, false)
  })
}

export default campaignsPlayController