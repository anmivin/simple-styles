import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router';

import { isToday } from 'date-fns';
import { useEvent, useStore, useUnit } from 'effector-react';
import { debounce } from 'lodash';
import { EventType } from 'openapi-client-generator/Schedule';
import plural from 'plural-ru';

import { LayoutTypes } from 'pages/Layout/Layout.types';

import { Header } from 'widgets/Header/Header';
import NotificationDrawer from 'widgets/NotificationDrawer';
import PageLayout from 'widgets/PageLayout';
import { UpdateAppService } from 'widgets/UpdateApp/UpdateApp.model';
import UpdateApp from 'widgets/UpdateApp/View';

import 'features/callHistory/linkInterestToCall/linkInterestToCall.model';
import { CallRedirectService } from 'features/callRedirect/CallRedirect.model';
import NotificationContainer from 'features/notification/NotificationContainer';
import PresentationSnackbars from 'features/objects/PresentationSnackbars';
import {
  InterestOperationType,
  callRedirectSuccessSnackbarArgs,
  cancelSnackbarArgs,
  clientCallEndedSnackbarArgs,
  copyClientSnackbarArgs,
  duplicateTemplateSnackbarArgs,
  errorSnackbarArgs,
  hidePriceSnackbarArgs,
  infoSnackbarArgs,
  micMutedSnackbarArgs,
  micUnmutedSnackbarArgs,
  mortgageSnackbarArgs,
  showPriceSnackbarArgs,
  snackbarArgs,
  successSnackbarArgs,
  userBusySnackbarArgs,
  userFreeSnackbarArgs,
} from 'features/snackbar/Snackbar.constants';
import { SnackbarService } from 'features/snackbar/Snackbar.model';

import ApprovalFormContainer from 'entities/approval/ApprovalFormService/ApprovalsForm.container';
import { ApprovalFormService } from 'entities/approval/ApprovalFormService/ApprovalsForm.model';
import { CurrentApprovalService } from 'entities/approval/CurrentApprovalService/CurrentApproval.model';
import PaidApprovalFormContainer from 'entities/approval/PaidApprovalFormService/PaidApprovalForm.container';
import { PaidApprovalFormService } from 'entities/approval/PaidApprovalFormService/PaidApprovalForm.model';
import { AuthErrorService } from 'entities/auth/AuthErrorService/AuthError.model';
import { AuthSuccessModel } from 'entities/auth/AuthSuccess/AuthSuccess.model';
import ClientProfileFormContainer from 'entities/clientProfile/ClientProfileFormService/ClientProfileForm.container';
import { ClientProfileFormService } from 'entities/clientProfile/ClientProfileFormService/ClientProfileForm.model';
import ClientProfileFormMobileContainer from 'entities/clientProfile/ClientProfileFormService/ClientProfileFormMobile.container';
import { CurrentClientProfileService } from 'entities/clientProfile/CurrentClientProfileService/CurrentClientProfile.model';
import { SeeAsManagerService } from 'entities/employees/Employees.model';
import ShareholderGateContainer from 'entities/employees/Shareholders';
import { CurrentEventService } from 'entities/events/CurrentEventService/CurrentEventService.model';
import EventSnackbar from 'entities/events/EventSnackbar';
import CallFormContainer from 'entities/events/EventsFormService/CallForm/CallForm.container';
import { CallFormService } from 'entities/events/EventsFormService/CallForm/CallForm.model';
import InternalMeetFormContainer from 'entities/events/EventsFormService/InternalMeetForm/InternalMeetForm.container';
import { InternalMeetFormService } from 'entities/events/EventsFormService/InternalMeetForm/InternalMeetForm.model';
import MassCallFormContainer from 'entities/events/EventsFormService/MassCallForm/MassCallForm.container';
import MeetFormContainer from 'entities/events/EventsFormService/MeetForm/MeetForm.container';
import { MeetFormService } from 'entities/events/EventsFormService/MeetForm/MeetForm.model';
import TasksFormContainer from 'entities/events/EventsFormService/TaskForm/TaskForm.container';
import { TaskFormService } from 'entities/events/EventsFormService/TaskForm/TaskForm.model';
import { TodayEventsService } from 'entities/events/TodayEvents/TodayEvents.model';
import { CurrentInterestService } from 'entities/interest/CurrentInterestService/CurrentInterest.model';
import InterestDuplicateFormContainer from 'entities/interest/InterestsDuplicateFormService/InterestsDuplicateForm.container';
import InterestDuplicateFormMobileContainer from 'entities/interest/InterestsDuplicateFormService/InterestsDuplicateFormMobile.container copy';
import InterestFormContainer from 'entities/interest/InterestsFormService/InterestsForm.container';
import { InterestFormService } from 'entities/interest/InterestsFormService/InterestsForm.model';
import InterestFormMobileContainer from 'entities/interest/InterestsFormService/InterestsFormMobile.container';
import {
  interestErrorSnackbarArgs,
  interestSuccessSnackbarArgs,
} from 'entities/interest/InterestsFormService/View/InterestForm.constants';
import { InterestsService } from 'entities/interest/InterestsService/Interests.model';
import LegalEntityFormContainer from 'entities/legalEntities/LegalEntitityFormService/LegalEntityForm.container';
import LegalEntityDuplicateFormContainer from 'entities/legalEntities/LegalEntityDuplicateFormService/LegalEntityDuplicateForm.container';
import { NotificationService } from 'entities/notification/Notification.model';
import BookingFormContainer from 'entities/objects/BookingFormService/BookingForm.container';
import { ComplexService } from 'entities/objects/ComplexService/Complex.model';
import { EventsEnumService } from 'entities/objects/EventsEnumService/EventsEnumService.model';
import { ObjectsEnumService } from 'entities/objects/ObjectsEnumService/ObjectsEnum.model';
import PaidBookingFormContainer from 'entities/objects/PaidBookingFormService';
import { TodayBookingService } from 'entities/objects/TodayBooking/TodayBooking.model';

import { Abilities, Can, CrudAbility } from 'shared/ability/Ability';
import { APP_STORE_URL } from 'shared/constants/appVersion';
import { Paths } from 'shared/constants/routingPathes';
import { handleOpenEventForm } from 'shared/hooks/handleOpenEventForm';
import { handleOpenInterestCard } from 'shared/hooks/handleOpenInterestForm';
import usePushListener from 'shared/hooks/usePushListener';
import { toDate } from 'shared/libs/date';
import { PlatformTypeService } from 'shared/models/PlatformType.models';
import { StyledSnackbarText } from 'shared/styled/shared.styled';
import { ViewType } from 'shared/types/typePlatform';
import BookingNotificationDetailedPlan from 'shared/ui/BookingNotificationDetailedPlan';
import ErrorScreen from 'shared/ui/ErrorScreen';
import { EventVariants } from 'shared/ui/EventFooter';
import EventNotificationDetailedPlan from 'shared/ui/EventNotificationDetailedPlan';
import Snackbar from 'shared/ui/Snackbar';

import { StyledIonHeader } from './Layout.styled';

import BirthdayFirstShowPlanContainer from '../../features/floatNotification/BirthdayTodayPlan/BirthdayFirstShowPlan.container';
import BirthdayTodayPlanContainer from '../../features/floatNotification/BirthdayTodayPlan/BirthdayTodayPlan.container';
import { TodayBirthdayService } from '../../features/floatNotification/BirthdayTodayPlan/BirthdayTodayPlan.model';

const {
  outputs: { $openNotificationModal, $notificationsItems, $newNotifications, $pendingNotifications },
  inputs: { setOpenNotificationModal, clearNewNotifications, setAllNotificationsIsRead, setOneNotificationsIsRead },
} = NotificationService;

const {
  gates: { ComplexGate },
} = ComplexService;

const {
  inputs: { setOpenDetailedPlan, setEventsPlanState },
  outputs: {
    $openDetailedPlan,
    $todayEvents,
    $pendingTodayEvents,
    $missedEvents,
    $pendingMissedEvents,
    $eventsPlanState,
  },
  gates: { TodayEventsFirstShowGate },
} = TodayEventsService;

const {
  inputs: { setBirthdayCollapseBoxOpen },
  outputs: { $birthdayCollapseBoxOpen },
} = TodayBirthdayService;

const {
  inputs: { setOpenBookingDetailedPlan, setBookingPlanState },
  outputs: { $bookingList, $pendingBookingList, $firstShowBookingList, $openDetailedBookingPlan, $bookingPlanState },
  gates: { TodayBookingFirstShowGate },
} = TodayBookingService;

const {
  outputs: { $birthdayInterestsList, $pendingBirthdayInterests },
  inputs: { setOpenDetailBirthdayPlan },
} = TodayBirthdayService;

const {
  outputs: { $currentEvent },
  inputs: { setCurrentEvent, fetchReadEvent },
} = CurrentEventService;

const {
  inputs: { setChangeTaskEvent, setOpenTaskForm },
  outputs: { $changeTaskEvent },
} = TaskFormService;

const {
  inputs: { setChangeMeetEvent, setOpenMeetForm },
  outputs: { $changeMeetEvent },
} = MeetFormService;

const {
  inputs: { setOpenInternalMeetForm },
} = InternalMeetFormService;

const {
  inputs: { setChangeCallEvent, setOpenCallForm },
  outputs: { $changeCallEvent },
} = CallFormService;

const {
  outputs: { $selectedApproval, $selectedPaidApproval },
  inputs: { setSelectedApproval },
} = CurrentApprovalService;

const {
  outputs: { $currentApprovalNumber },
  inputs: { setApprovalModalOpen },
  gates: { approvalItemGate },
} = ApprovalFormService;

const {
  gates: { PaidApprovalItemGate },
} = PaidApprovalFormService;

const {
  inputs: {
    setCreateEventSnackbarOpen,
    setOpenMeetRemoveSuccess,
    setOpenInternalMeetRemoveSuccess,
    setOpenTaskRemoveSuccess,
    setOpenRemoveCallForm,
    setOpenMeetSuccess,
    setOpenTaskSuccess,
    setOpenCallSuccess,
    setOpenMassCallSuccess,
    setOpenErrorSnackbar,
    setOpenError400Snackbar,
    setUpdateReservationSnackbarOpen,
    setApprovalModificationSnackbarOpen,
    setProlongateReservationSnackbarOpen,
    setProlongateRequestSnackbarOpen,
    setRefuseProlongateReservationSnackbarOpen,
    setRefuseApprovalSnackbarOpen,
    setCreateReservationSnackbarOpen,
    setCreatePaidReservationSnackbarOpen,
    setCreateAndApproveReservationSnackbarOpen,
    setCreateVerbalReservationSnackbarOpen,
    setExistingClientSnackbarType,
    setExportInterestSnackbarOpen,
    setFailExportInterestSnackbarOpen,
    setGetToWorkSnackbarOpen,
    setHidePriceSnackbarOpen,
    setShowPriceSnackbarOpen,
    setUserFreeSnackbarOpen,
    setUserBusySnackbarOpen,
    setMicMutedSnackbarOpen,
    setMicUnmutedSnackbarOpen,
    setCopyClientSnackbarOpen,
    setOpenSuccessModal,
    setOpenSuccessLelalEntityModal,
    setUpdateVerbalReservationSnackbarOpen,
    setSuccessDuplicateTemplate,
    setCanceledReservationSnackbarOpen,
    setCancelProlongateApprovalSnackbarOpen,
    setRefuseProlongatePaidReservationSnackbarOpen,
    setOpenErrorRejectInterestSnackbar,
  },
  outputs: {
    $createEventSnackbarOpen,
    $openTaskRemoveSuccess,
    $openMeetRemoveSuccess,
    $openInternalMeetRemoveSuccess,
    $openCallRemoveSuccess,
    $openCallSuccess,
    $openMassCallSuccess,
    $openTaskSuccess,
    $openMeetSuccess,
    $openErrorSnackbar,
    $openError400Snackbar,
    $updateReservationSnackbarOpen,
    $approvalModificationSnackbarOpen,
    $prolongateReservationSnackbarOpen,
    $prolongateRequestSnackbarOpen,
    $createReservationSnackbarOpen,
    $createPaidReservationSnackbarOpen,
    $createAndApproveReservationSnackbarOpen,
    $createVerbalReservationSnackbarOpen,
    $refuseProlongateReservationSnackbarOpen,
    $refuseApprovalSnackbarOpen,
    $existingClientSnackbarType,
    $exportInterestSnackbarOpen,
    $failExportInterestSnackbarOpen,
    $getToWorkSnackbarOpen,
    $hidePriceSnackbarOpen,
    $showPriceSnackbarOpen,
    $userFreeSnackbarOpen,
    $userBusySnackbarOpen,
    $micMutedSnackbarOpen,
    $micUnmutedSnackbarOpen,
    $copyClientSnackbarOpen,
    $openSuccessModal,
    $updateVerbalReservationSnackbarOpen,
    $interestOperationType,
    $legalEntityOperationType,
    $openSuccessLelalEntityModal,
    $successDuplicateTemplate,
    $canceledReservationSnackbarOpen,
    $cancelProlongateApprovalSnackbarOpen,
    $refuseProlongatePaidReservationSnackbarOpen,
    $openErrorRejectInterestSnackbar,
  },
} = SnackbarService;

const {
  outputs: { $callRedirectSuccessSnackbar, $clientCallEndedSnackbar },
  inputs: { dismissCallRedirectSuccessSnackbar, setClientCallEndedSnackbar },
} = CallRedirectService;

const {
  outputs: { $isManager, $isChiefManager, $isActionManager },
} = AuthSuccessModel;

const {
  outputs: { $viewType },
} = PlatformTypeService;

const {
  inputs: { setInterestFormUUID, setIsCreateMode, setIsFromEvent, setIsPreFilledPhone },
  outputs: { $isCreateMode },
} = InterestFormService;

const {
  outputs: { $selectedInterestItems },
} = InterestsService;

const {
  outputs: { $currError },
  inputs: { setCurrError, setIsErrorOccurred },
} = AuthErrorService;

const {
  inputs: { closeUpdateApp },
  outputs: { $showUpdateApp, $lastSeenDate },
  gates: { updateAppGate },
} = UpdateAppService;

const {
  gates: { seeAsManagerGate },
} = SeeAsManagerService;

const {
  outputs: { $objectsEnum, $pendingEnums },
  gates: { EnumGate },
} = ObjectsEnumService;

const {
  outputs: { $eventsEnum, $pendingEventsEnums },
  gates: { EventsEnumGate },
} = EventsEnumService;

const {
  inputs: { setSelectedInterest },
} = CurrentInterestService;

const {
  inputs: { setClientProfileFormOpen },
} = ClientProfileFormService;

const {
  inputs: { setSelectedClientProfileId },
} = CurrentClientProfileService;

const {
  outputs: { $assignedCounter },
} = InterestsService;

// @Mobile: Исправить Layout в соответствии с изменений Иконок, изменить Header и добавить NotificationContainer
export const Layout: FC<LayoutTypes> = ({ children }) => {
  const viewType = useStore($viewType);
  const history = useHistory();
  const currentError = useStore($currError);
  const setErrorOccurred = useEvent(setIsErrorOccurred);
  const currError = useEvent(setCurrError);

  // Появилась новая версия
  const isOpenNewApp = useStore($showUpdateApp);
  const lastSeenUpdateRequest = useStore($lastSeenDate);
  const condition = !(lastSeenUpdateRequest && isToday(lastSeenUpdateRequest));
  const onCloseNewApp = useEvent(closeUpdateApp);
  const UpdateAppGate = updateAppGate;
  const handleUpdateApp = () => {
    window.open(APP_STORE_URL, '_blank');
  };

  const SeeAsManagerGate = seeAsManagerGate;

  const openNotificationModal = useStore($openNotificationModal);
  const openDetailedEventsPlan = useStore($openDetailedPlan);
  const setOpenDetailedEventsPlan = useEvent(setOpenDetailedPlan);
  const todayEvents = useStore($todayEvents);
  const pendingTodayEvents = useStore($pendingTodayEvents);
  const missedEvents = useStore($missedEvents);
  const pendingMissedEvents = useStore($pendingMissedEvents);
  const isOpenEventsPlanInDrawer = useStore($eventsPlanState);
  const setOpenEventsPlanInDrawer = useEvent(setEventsPlanState);

  const [isOpenTodayBirthday, setOpenTodayBirthday] = useUnit([$birthdayCollapseBoxOpen, setBirthdayCollapseBoxOpen]);

  const bookingList = useStore($bookingList);
  const pendingBookingList = useStore($pendingBookingList);
  const isOpenBookingPlan = useStore($bookingPlanState);
  const setOpenBookingPlan = useEvent(setBookingPlanState);
  const isOpenBookingDetailedPlan = useStore($openDetailedBookingPlan);
  const setOpenDetailedBookingPlan = useEvent(setOpenBookingDetailedPlan);

  const [birthdayInterestsList, pendingBirthdayInterests, setOpenDetailPlan] = useUnit([
    $birthdayInterestsList,
    $pendingBirthdayInterests,
    setOpenDetailBirthdayPlan,
  ]);

  const FirstShowTodayEventsGate = TodayEventsFirstShowGate;
  const FirstShowTodayBookingGate = TodayBookingFirstShowGate;

  const selectedEvent = useStore($currentEvent);

  const openCreateEventSnackbar = useStore($createEventSnackbarOpen);
  const taskSuccess = useStore($openTaskSuccess);
  const taskRemoveSuccess = useStore($openTaskRemoveSuccess);
  const eventTypeTask = useStore($changeTaskEvent);

  const meetSuccess = useStore($openMeetSuccess);
  const meetRemoveSuccess = useStore($openMeetRemoveSuccess);
  const eventTypeMeet = useStore($changeMeetEvent);

  const internalMeetRemoveSuccess = useStore($openInternalMeetRemoveSuccess);

  const callSuccess = useStore($openCallSuccess);
  const massCallSuccess = useStore($openMassCallSuccess);
  const callRemoveSuccess = useStore($openCallRemoveSuccess);
  const eventTypeCall = useStore($changeCallEvent);

  //выбранные клиенты
  const selectedClientItems = useStore($selectedInterestItems);

  const eventSnackbarError = useStore($openErrorSnackbar);
  const snackbarError400BussinesCard = useStore($openError400Snackbar);
  const existingClientSnackbarType = useStore($existingClientSnackbarType);

  const setIsOpenSnackbarError = useEvent(setOpenErrorSnackbar);
  const setIsOpenSnackbarError400 = useEvent(setOpenError400Snackbar);
  const setErrorExistingClientSnackbarType = useEvent(setExistingClientSnackbarType);

  const [
    exportInterestSnackbarOpen,
    setIsExportInterestSnackbarOpen,
    failExportInterestSnackbarOpen,
    setIsFailExportInterestSnackbarOpen,
  ] = useUnit([
    $exportInterestSnackbarOpen,
    setExportInterestSnackbarOpen,
    $failExportInterestSnackbarOpen,
    setFailExportInterestSnackbarOpen,
  ]);
  const setIsOpenNotificationModal = useEvent(setOpenNotificationModal);

  const changeTaskEvent = useEvent(setChangeTaskEvent);
  const changeMeetEvent = useEvent(setChangeMeetEvent);
  const changeCallEvent = useEvent(setChangeCallEvent);
  const handleSetTaskFormOpen = useEvent(setOpenTaskForm);
  const handleSetMeetFormOpen = useEvent(setOpenMeetForm);
  const handleSetInternalMeetFormOpen = useEvent(setOpenInternalMeetForm);
  const handleSetCallFormOpen = useEvent(setOpenCallForm);
  const setOpenCreateEventSnackbar = useEvent(setCreateEventSnackbarOpen);

  const setIsOpenTaskSuccess = useEvent(setOpenTaskSuccess);
  const setIsOpenTaskRemoveSuccess = useEvent(setOpenTaskRemoveSuccess);

  const setIsOpenMeetSuccess = useEvent(setOpenMeetSuccess);
  const setIsOpenMeetRemoveSuccess = useEvent(setOpenMeetRemoveSuccess);
  const setIsOpenInternalMeetRemoveSuccess = useEvent(setOpenInternalMeetRemoveSuccess);

  const setIsOpenCallSuccess = useEvent(setOpenCallSuccess);
  const setIsOpenCallRemoveSuccess = useEvent(setOpenRemoveCallForm);

  const setIsOpenMassCallSuccess = useEvent(setOpenMassCallSuccess);

  const isOpenUpdateReservationSnackbar = useStore($updateReservationSnackbarOpen);
  const setOpenUpdateReservationSnackbar = useEvent(setUpdateReservationSnackbarOpen);

  const isOpenCanceledReservationSnackbar = useStore($canceledReservationSnackbarOpen);
  const setOpenCanceledReservationSnackbar = useEvent(setCanceledReservationSnackbarOpen);

  //снекбао отмены продления согласования
  const isOpenCancelProlongateApprovalSnackbar = useStore($cancelProlongateApprovalSnackbarOpen);
  const setOpenCancelProlongateApprovalSnackbar = useEvent(setCancelProlongateApprovalSnackbarOpen);

  const isOpenApprovalModificationSnackbar = useStore($approvalModificationSnackbarOpen);
  const setOpenApprovalModificationSnackbar = useEvent(setApprovalModificationSnackbarOpen);

  const isOpenUpdateVerbalReservationSnackbar = useStore($updateVerbalReservationSnackbarOpen);
  const setOpenUpdateVerbalReservationSnackbar = useEvent(setUpdateVerbalReservationSnackbarOpen);

  const interestOperationType = useStore($interestOperationType);
  const isInterestSuccessSnackbarOpen = useStore($openSuccessModal);
  const setOpenInterestSuccessSnackbarOpen = useEvent(setOpenSuccessModal);

  //юр.лица
  const legalEntityOperationType = useStore($legalEntityOperationType);
  const isLelalEntitySnackbarOpen = useStore($openSuccessLelalEntityModal);
  const setOpenSuccessLelalEntitySnackbarOpen = useEvent(setOpenSuccessLelalEntityModal);

  const isOpenProlongateReservationSnackbar = useStore($prolongateReservationSnackbarOpen);
  const setOpenProlongateReservationSnackbar = useEvent(setProlongateReservationSnackbarOpen);
  const isOpenProlongateRequestSnackbar = useStore($prolongateRequestSnackbarOpen);
  const setOpenProlongateRequestSnackbar = useEvent(setProlongateRequestSnackbarOpen);

  //отказ согласования
  const isOpenRefuseApprovalSnackbar = useStore($refuseApprovalSnackbarOpen);
  const setOpenRefuseApprovalSnackbar = useEvent(setRefuseApprovalSnackbarOpen);

  //отказ продления
  const isOpenRefuseProlongateRequestSnackbar = useStore($refuseProlongateReservationSnackbarOpen);
  const setOpenRefuseProlongateRequestSnackbar = useEvent(setRefuseProlongateReservationSnackbarOpen);
  //отказ продления платной брони
  const isOpenRefuseProlongatePaidRequestSnackbar = useStore($refuseProlongatePaidReservationSnackbarOpen);
  const setOpenRefuseProlongatePaidRequestSnackbar = useEvent(setRefuseProlongatePaidReservationSnackbarOpen);

  const isClientSuccessSnackbarOpen = useStore($openSuccessModal);
  const setOpenClientSuccessSnackbarOpen = useEvent(setOpenSuccessModal);

  const isOpenSuccessDuplicateTemplateSnackbar = useStore($successDuplicateTemplate);
  const setOpenSuccessDuplicateTemplateSnackbar = useEvent(setSuccessDuplicateTemplate);

  const isClientCreateMode = useStore($isCreateMode);

  //форма бронирования
  const openCreateReservationSnackbar = useStore($createReservationSnackbarOpen);
  const setOpenCreateReservationSnackbar = useEvent(setCreateReservationSnackbarOpen);
  const openCreateAndApproveReservationSnackbar = useStore($createAndApproveReservationSnackbarOpen);
  const setOpenCreateAndApproveReservationSnackbar = useEvent(setCreateAndApproveReservationSnackbarOpen);
  const openCreateVerbalReservationSnackbar = useStore($createVerbalReservationSnackbarOpen);
  const setOpenCreateVerbalReservationSnackbar = useEvent(setCreateVerbalReservationSnackbarOpen);
  const openCreatePaidReservationSnackbar = useStore($createPaidReservationSnackbarOpen);
  const setOpenCreatePaidReservationSnackbar = useEvent(setCreatePaidReservationSnackbarOpen);

  const removeCurrentEvent = useEvent(setCurrentEvent);
  const setSelectedEvent = useEvent(fetchReadEvent);

  const objectsEnum = useStore($objectsEnum);
  const pendingEnums = useStore($pendingEnums);
  const ObjectsEnumGate = EnumGate;

  const eventsEnum = useStore($eventsEnum);
  const pendingEventsEnums = useStore($pendingEventsEnums);
  const IsEventsEnumGate = EventsEnumGate;

  //снекбар "взять в работу ипотечную заявку"
  const openGetToWorkSnackbarOpen = useStore($getToWorkSnackbarOpen);
  const setOpenGetToWorkSnackbarOpen = useEvent(setGetToWorkSnackbarOpen);

  //снекбарs "цены скрыты / отображены"
  const openHidePriceSnackbar = useStore($hidePriceSnackbarOpen);
  const setOpenHidePriceSnackbar = useEvent(setHidePriceSnackbarOpen);
  const openShowPriceSnackbar = useStore($showPriceSnackbarOpen);
  const setOpenShowPriceSnackbar = useEvent(setShowPriceSnackbarOpen);

  //снекбары доступности пользователя
  const openUserFreeSnackbar = useStore($userFreeSnackbarOpen);
  const setOpenUserFreeSnackbar = useEvent(setUserFreeSnackbarOpen);
  const openUserBusySnackbar = useStore($userBusySnackbarOpen);
  const setOpenUserBusySnackbar = useEvent(setUserBusySnackbarOpen);

  //снекбары микрофона
  const openMicMutedSnackbar = useStore($micMutedSnackbarOpen);
  const setOpenMicMutedSnackbar = useEvent(setMicMutedSnackbarOpen);
  const openMicUnmutedSnackbar = useStore($micUnmutedSnackbarOpen);
  const setOpenMicUnmutedSnackbar = useEvent(setMicUnmutedSnackbarOpen);

  const callRedirectSuccessSnackbar = useStore($callRedirectSuccessSnackbar);
  const clientCallEndedSnackbar = useStore($clientCallEndedSnackbar);
  const dismissCallRedirectSuccessSnackbarEvent = useEvent(dismissCallRedirectSuccessSnackbar);
  const setClientCallEndedSnackbarEvent = useEvent(setClientCallEndedSnackbar);

  //снекбары  копирования клиента
  const copyClientSnackbarOpen = useStore($copyClientSnackbarOpen);
  const setIsCopyClientSnackbarOpen = useEvent(setCopyClientSnackbarOpen);
  // номер согласования для снекбаров
  const currentApprovalNumber = useStore($currentApprovalNumber);
  const setIsApprovalModalOpen = useEvent(setApprovalModalOpen);
  const selectedApprovalItem = useStore($selectedApproval);
  const selectedPaidApprovalItem = useStore($selectedPaidApproval);
  const setCurrentApproval = useEvent(setSelectedApproval);
  const setOpenSelectedReservation = useEvent(setApprovalModalOpen);
  const ApprovalItemGate = approvalItemGate;

  //счетчик "назначено на вас"
  const assignedCounter = useStore($assignedCounter);

  // Снекбар некорректного перевода интереса в отказ
  const [isOpenErrorRejectSnackbar, setOpenErrorRejectSnackbar] = useUnit([
    $openErrorRejectInterestSnackbar,
    setOpenErrorRejectInterestSnackbar,
  ]);

  const currentPath = window.location.pathname;

  const handleChangeEventType = useMemo(
    () => ({
      onChangeCallEventType: changeCallEvent,
      onChangeMeetEventType: changeMeetEvent,
      onChangeTaskEventType: changeTaskEvent,
    }),
    [],
  );

  const handleOpenForm = useMemo(
    () => ({
      onOpenCallForm: handleSetCallFormOpen,
      onOpenMeetForm: handleSetMeetFormOpen,
      onOpenTaskForm: handleSetTaskFormOpen,
      onOpenInternalMeetForm: handleSetInternalMeetFormOpen,
    }),
    [],
  );

  usePushListener(handleChangeEventType, setSelectedEvent, handleOpenForm);

  const openForm = useCallback(() => {
    switch (selectedEvent?.eventType) {
      case EventType.TASK: {
        handleChangeEventType.onChangeTaskEventType(EventVariants.create);
        removeCurrentEvent(null);
        handleOpenForm.onOpenTaskForm(true);
        break;
      }
      case EventType.CALL: {
        handleChangeEventType.onChangeCallEventType(EventVariants.create);
        removeCurrentEvent(null);
        handleOpenForm.onOpenCallForm(true);
        break;
      }
      case EventType.MEETING: {
        handleChangeEventType.onChangeMeetEventType(EventVariants.create);
        removeCurrentEvent(null);
        handleOpenForm.onOpenMeetForm(true);
        break;
      }
      case EventType.INTERNAL_MEETING: {
        removeCurrentEvent(null);
        handleOpenForm.onOpenInternalMeetForm(true);
        break;
      }
    }
  }, [selectedEvent]);

  const taskName = useMemo(() => {
    switch (selectedEvent?.eventType) {
      case EventType.TASK: {
        return selectedEvent.taskName;
      }
      case EventType.CALL: {
        return `Звонок с ${selectedEvent.taskName}`;
      }
      case EventType.MEETING: {
        return `Встреча с ${selectedEvent.taskName}`;
      }
      case EventType.INTERNAL_MEETING: {
        return selectedEvent.taskName;
      }
    }
  }, [selectedEvent]);

  const isManager = useStore($isManager);
  const isChiefManager = useStore($isChiefManager);
  const isActionManager = useStore($isActionManager);

  //уведомления

  const notificationsItems = useStore($notificationsItems);
  const newNotifications = useStore($newNotifications);
  const pendingNotifications = useStore($pendingNotifications);
  const setAllNotificationsIsReadHandler = useEvent(setAllNotificationsIsRead);
  const setIsOneNotificationsIsRead = useEvent(setOneNotificationsIsRead);
  const clearIsNewNotifications = useEvent(clearNewNotifications);

  const [setInterestFormUUIDTrigger, setIsFormCreateMode, setFromEvent, setPreFilledPhone] = useUnit([
    setInterestFormUUID,
    setIsCreateMode,
    setIsFromEvent,
    setIsPreFilledPhone,
  ]);
  const [setOpenClientForm, getClientProfileById] = useUnit([setClientProfileFormOpen, setSelectedClientProfileId]);

  const [isNewNotification, setIsNewNotification] = useState(false);
  const clearNotificationsTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const isOnlyActionManager = isActionManager && !isManager && !isChiefManager;
  if (isOnlyActionManager && currentPath !== `/internal/apps/sales${Paths.actionManager}`) {
    history.push(Paths.actionManager);
  }

  const closeNotifications = useMemo(
    () =>
      debounce(() => {
        if (clearNotificationsTimeoutRef.current) {
          clearTimeout(clearNotificationsTimeoutRef.current);
        }

        setIsNewNotification(false);
        clearNotificationsTimeoutRef.current = setTimeout(() => {
          clearIsNewNotifications();
          clearNotificationsTimeoutRef.current = undefined;
        }, 500);
      }, 7000),
    [clearIsNewNotifications],
  );
  useEffect(() => {
    if (!isNewNotification) {
      return;
    }

    closeNotifications();

    return () => closeNotifications.cancel();
  }, [closeNotifications, isNewNotification]);

  useEffect(() => {
    return () => {
      closeNotifications.cancel();

      if (clearNotificationsTimeoutRef.current) {
        clearTimeout(clearNotificationsTimeoutRef.current);
      }
    };
  }, [closeNotifications]);

  useEffect(() => {
    if (newNotifications.length > 0) {
      setIsNewNotification(true);
    }
  }, [newNotifications]);

  const ComplexGateAll = ComplexGate;
  return (
    <>
      <ComplexGateAll />
      <SeeAsManagerGate />
      <EventsEnumGate />
      {viewType === ViewType.Tablet && condition && (
        <>
          <UpdateAppGate />

          <UpdateApp open={isOpenNewApp} onUpdate={handleUpdateApp} onDismiss={onCloseNewApp} isPhone={false} />
        </>
      )}

      <Can do={CrudAbility.READ} on={Abilities.EVENTS}>
        <FirstShowTodayEventsGate />
      </Can>
      <Can do={CrudAbility.READ} on={Abilities.RESERVATION}>
        <TodayBookingFirstShowGate />
      </Can>

      <ObjectsEnumGate />

      <Can do={CrudAbility.READ} on={Abilities.RESERVATION}>
        {selectedApprovalItem && <ApprovalItemGate reservationId={selectedApprovalItem || ''} />}
      </Can>

      <Can do={CrudAbility.READ} on={Abilities.PAID_BOOKING}>
        {selectedPaidApprovalItem && <PaidApprovalItemGate reservationId={selectedPaidApprovalItem || ''} />}
      </Can>
      {viewType !== ViewType.Phone && (
        <StyledIonHeader viewType={viewType}>
          <Header
            viewType={viewType}
            items={newNotifications}
            isNewNotification={isNewNotification}
            assignedCounter={assignedCounter}
            onOpenForm={(eventId, eventType) =>
              handleOpenEventForm({
                eventId,
                eventType,
                formType: EventVariants.read,
                onChangeEventType: handleChangeEventType,
                onChangeSelectedEvent: setSelectedEvent,
                onOpenForms: handleOpenForm,
              })
            }
            onOpenInterestForm={(phone, interestId, clientProfileId) =>
              handleOpenInterestCard({
                phone,
                clientProfileId,
                interestId,
                onChangeSelectInterest: setSelectedInterest,
                onChangePreFilledPhone: setPreFilledPhone,
                setIsFormCreateMode: setIsFormCreateMode,
                setFromEvent: setFromEvent,
                setInterestFormUUIDTrigger: setInterestFormUUIDTrigger,
                getClientProfileById: getClientProfileById,
                setOpenClientForm: setOpenClientForm,
              })
            }
            onOpenApprovalForm={(id) => {
              setCurrentApproval(id);
              setIsApprovalModalOpen(true);
            }}
            selectedEvent={selectedEvent}
            hideNotifications={currentError != null}
            setIsNewNotification={setIsNewNotification}
          />
        </StyledIonHeader>
      )}
      {currentError != null ? (
        <PageLayout viewType={viewType} withLayout={false}>
          <ErrorScreen errorVariant={currentError} />
        </PageLayout>
      ) : (
        <>{children}</>
      )}

      <NotificationDrawer
        onClose={() => setIsOpenNotificationModal(false)}
        open={openNotificationModal}
        pendingNotifications={pendingNotifications}
        onRead={() => setAllNotificationsIsReadHandler()}
        onOpenForm={(eventId, eventType) =>
          handleOpenEventForm({
            eventId,
            eventType,
            formType: EventVariants.read,
            onChangeEventType: handleChangeEventType,
            onChangeSelectedEvent: setSelectedEvent,
            onOpenForms: handleOpenForm,
          })
        }
        onOpenInterestForm={(phone, interestId, clientProfileId) =>
          handleOpenInterestCard({
            phone,
            clientProfileId,
            interestId,
            onChangeSelectInterest: setSelectedInterest,
            onChangePreFilledPhone: setPreFilledPhone,
            setIsFormCreateMode: setIsFormCreateMode,
            setFromEvent: setFromEvent,
            setInterestFormUUIDTrigger: setInterestFormUUIDTrigger,
            getClientProfileById: getClientProfileById,
            setOpenClientForm: setOpenClientForm,
          })
        }
        items={notificationsItems}
        selectedEvent={selectedEvent}
        setOneNotificationsIsRead={setIsOneNotificationsIsRead}
        onClickTodayEvents={() => setOpenDetailedEventsPlan(true)}
        todayEvents={
          todayEvents?.items.map((it) => ({
            id: it.id,
            eventType: it.eventType,
            taskName: it.taskName,
            isActive: it.isActive,
            isImportant: it.isImportant,
            ColorCode: it.ColorCode,
            startDate: toDate(it.startDate),
            endDate: toDate(it.endDate),
          })) ?? null
        }
        pendingTodayEvents={pendingTodayEvents}
        missedEvents={
          missedEvents?.items.map((it) => ({
            id: it.id,
            eventType: it.eventType,
            taskName: it.taskName,
            isActive: it.isActive,
            isImportant: it.isImportant,
            ColorCode: it.ColorCode,
            startDate: toDate(it.startDate),
            endDate: toDate(it.endDate),
          })) ?? null
        }
        pendingMissedEvents={pendingMissedEvents}
        isEventsPlanOpen={isOpenEventsPlanInDrawer}
        setEventsPlanOpen={setOpenEventsPlanInDrawer}
        bookingList={bookingList?.items ?? null}
        pendingBookingList={pendingBookingList}
        isApprovalsPlanOpen={isOpenBookingPlan}
        setApprovalsPlanOpen={setOpenBookingPlan}
        onClickTodayBooking={() => setOpenDetailedBookingPlan(true)}
        onOpenApprovalForm={(id) => {
          setCurrentApproval(id);
          setIsApprovalModalOpen(true);
        }}
        isTodayBirthdayOpen={isOpenTodayBirthday}
        setTodayBirthdayOpen={setOpenTodayBirthday}
        pendingBirthdayInterestsList={pendingBirthdayInterests}
        birthdayInterestsList={birthdayInterestsList?.items ?? null}
      />

      <EventNotificationDetailedPlan
        todayEvents={
          todayEvents?.items.map((it) => ({
            id: it.id,
            eventType: it.eventType,
            taskName: it.taskName,
            isActive: it.isActive,
            isImportant: it.isImportant,
            ColorCode: it.ColorCode,
            startDate: toDate(it.startDate),
            endDate: toDate(it.endDate),
          })) ?? null
        }
        missedEvents={
          missedEvents?.items.map((it) => ({
            id: it.id,
            eventType: it.eventType,
            taskName: it.taskName,
            isActive: it.isActive,
            isImportant: it.isImportant,
            ColorCode: it.ColorCode,
            startDate: toDate(it.startDate),
            endDate: toDate(it.endDate),
          })) ?? null
        }
        pendingEvents={pendingTodayEvents}
        isOpen={openDetailedEventsPlan}
        onClose={() => setOpenDetailedEventsPlan(false)}
        onSubmit={() => {}}
        onOpenEvent={(eventId, eventType) =>
          handleOpenEventForm({
            eventId,
            eventType,
            formType: EventVariants.read,
            onChangeEventType: handleChangeEventType,
            onChangeSelectedEvent: setSelectedEvent,
            onOpenForms: handleOpenForm,
          })
        }
        viewType={viewType}
      />

      <BookingNotificationDetailedPlan
        bookingList={bookingList?.items ?? null}
        pendingBookingList={pendingBookingList}
        onClose={() => setOpenDetailedBookingPlan(false)}
        onSubmit={() => {}}
        onOpenReservation={(reservationId) => {
          setCurrentApproval(reservationId);
          setOpenSelectedReservation(true);
        }}
        isOpen={isOpenBookingDetailedPlan}
        objectsEnum={objectsEnum?.enums ?? null}
        pendingEnum={pendingEnums}
        viewType={viewType}
      />

      <Can do={CrudAbility.READ} on={Abilities.EVENTS}>
        <CallFormContainer />
        <MeetFormContainer />
        <InternalMeetFormContainer />
        <TasksFormContainer />
        <Can do={CrudAbility.READ} on={Abilities.RESERVATION}>
          <ApprovalFormContainer />
          <ShareholderGateContainer />
        </Can>
        <MassCallFormContainer />
        <Can do={CrudAbility.CREATE} on={Abilities.EVENTS}>
          <Snackbar
            {...snackbarArgs({
              taskName: taskName || '',
              onClick: openForm,
            })}
            open={openCreateEventSnackbar}
            onClose={() => setOpenCreateEventSnackbar(false)}
          />

          <Snackbar
            {...successSnackbarArgs()}
            open={taskSuccess}
            text={`Задача ${eventTypeTask === EventVariants.create ? 'создана' : 'отредактирована'}`}
            onClose={() => setIsOpenTaskSuccess(false)}
          />
          <Snackbar
            {...successSnackbarArgs()}
            open={taskRemoveSuccess}
            text="Задача удалена"
            onClose={() => setIsOpenTaskRemoveSuccess(false)}
          />

          <Snackbar
            {...successSnackbarArgs()}
            open={meetSuccess}
            text={`Встреча ${eventTypeMeet === EventVariants.create ? 'создана' : 'отредактирована'}`}
            onClose={() => setIsOpenMeetSuccess(false)}
          />
          <Snackbar
            {...successSnackbarArgs()}
            open={meetRemoveSuccess}
            text="Встреча удалена"
            onClose={() => setIsOpenMeetRemoveSuccess(false)}
          />
          <Snackbar
            {...successSnackbarArgs()}
            open={internalMeetRemoveSuccess}
            text="Встреча удалена"
            onClose={() => setIsOpenInternalMeetRemoveSuccess(false)}
          />

          <Snackbar
            {...successSnackbarArgs()}
            open={callSuccess}
            text={`Звонок ${eventTypeCall === EventVariants.create ? 'создан' : 'отредактирован'}`}
            onClose={() => setIsOpenCallSuccess(false)}
          />

          {/*  @TODO: протянуть количество выбранных клиентов */}
          <Snackbar
            {...successSnackbarArgs()}
            open={massCallSuccess}
            text={`Создано ${selectedClientItems.length} ${plural(
              selectedClientItems.length,
              'звонок',
              'звонка',
              'звонков',
            )}`}
            onClose={() => setIsOpenMassCallSuccess(false)}
          />

          <Snackbar
            {...successSnackbarArgs()}
            open={callRemoveSuccess}
            text="Звонок удален"
            onClose={() => setIsOpenCallRemoveSuccess(false)}
          />
        </Can>
      </Can>
      <Can do={CrudAbility.CREATE} on={Abilities.BOOKING}>
        <BookingFormContainer />
      </Can>
      <Can do={CrudAbility.CREATE} on={Abilities.PAID_BOOKING}>
        <PaidApprovalFormContainer />
        <PaidBookingFormContainer />
      </Can>
      <Can do={CrudAbility.CREATE} on={Abilities.CLIENT}>
        {viewType === ViewType.Phone ? <InterestFormMobileContainer /> : <InterestFormContainer />}
      </Can>

      {viewType === ViewType.Phone ? <InterestDuplicateFormMobileContainer /> : <InterestDuplicateFormContainer />}

      {viewType === ViewType.Phone ? <ClientProfileFormMobileContainer /> : <ClientProfileFormContainer />}

      <LegalEntityFormContainer />

      <LegalEntityDuplicateFormContainer />

      <Snackbar
        {...successSnackbarArgs()}
        text={`Заявка №${currentApprovalNumber} согласована`}
        open={isOpenUpdateReservationSnackbar}
        onClose={() => setOpenUpdateReservationSnackbar(false)}
      />

      <Snackbar
        {...cancelSnackbarArgs()}
        text={`Заявка №${currentApprovalNumber} отменена`}
        open={isOpenCanceledReservationSnackbar}
        onClose={() => setOpenCanceledReservationSnackbar(false)}
      />

      <Snackbar
        {...successSnackbarArgs()}
        text={`Заявка №${currentApprovalNumber} отправлена на доработку`}
        open={isOpenApprovalModificationSnackbar}
        onClose={() => setOpenApprovalModificationSnackbar(false)}
      />
      <Snackbar
        {...infoSnackbarArgs()}
        text={`В согласовании заявки №${currentApprovalNumber} отказано`}
        open={isOpenRefuseApprovalSnackbar}
        onClose={() => setOpenRefuseApprovalSnackbar(false)}
      />

      <Snackbar
        {...cancelSnackbarArgs()}
        text={`Продление заявки №${currentApprovalNumber} отменено`}
        open={isOpenCancelProlongateApprovalSnackbar}
        onClose={() => setOpenCancelProlongateApprovalSnackbar(false)}
      />

      <Snackbar
        {...cancelSnackbarArgs()}
        text={`Продление заявки №${currentApprovalNumber} отменено`}
        open={isOpenCancelProlongateApprovalSnackbar}
        onClose={() => setOpenCancelProlongateApprovalSnackbar(false)}
      />
      <Snackbar
        {...successSnackbarArgs()}
        text="Заявка на продление согласована"
        open={isOpenProlongateReservationSnackbar}
        onClose={() => setOpenProlongateReservationSnackbar(false)}
      />

      <Snackbar
        {...successSnackbarArgs()}
        text='Устное бронирование переведено в статус "Отправлено"'
        open={isOpenUpdateVerbalReservationSnackbar}
        onClose={() => setOpenUpdateVerbalReservationSnackbar(false)}
      />

      <Snackbar
        {...successSnackbarArgs()}
        text="Заявка на продление отправлена"
        open={isOpenProlongateRequestSnackbar}
        onClose={() => setOpenProlongateRequestSnackbar(false)}
      />

      <Snackbar
        {...infoSnackbarArgs()}
        text="Заявка на продление отклонена"
        open={isOpenRefuseProlongateRequestSnackbar}
        onClose={() => setOpenRefuseProlongateRequestSnackbar(false)}
      />

      <Snackbar
        {...errorSnackbarArgs()}
        text="В продлении заявки отказано"
        open={isOpenRefuseProlongatePaidRequestSnackbar}
        onClose={() => setOpenRefuseProlongatePaidRequestSnackbar(false)}
      />

      <Snackbar
        {...successSnackbarArgs()}
        text="Заявка на бронирование объекта отправлена"
        open={openCreateReservationSnackbar}
        onClose={() => setOpenCreateReservationSnackbar(false)}
      />

      <Snackbar
        {...successSnackbarArgs()}
        text="ОН забронирован для последующей оплаты"
        open={openCreatePaidReservationSnackbar}
        onClose={() => setOpenCreatePaidReservationSnackbar(false)}
      />

      <Snackbar
        {...successSnackbarArgs()}
        text="Заявка согласована"
        open={openCreateAndApproveReservationSnackbar}
        onClose={() => setOpenCreateAndApproveReservationSnackbar(false)}
      />

      <Snackbar
        {...successSnackbarArgs()}
        text="ОН забронирован на сутки, без согласования РОП"
        open={openCreateVerbalReservationSnackbar}
        onClose={() => setOpenCreateVerbalReservationSnackbar(false)}
      />

      <Snackbar
        {...errorSnackbarArgs()}
        open={eventSnackbarError}
        text={'Что-то пошло не так. Попробуйте еще позже.'}
        onClose={() => {
          setErrorOccurred(false);
          currError(null);
          setIsOpenSnackbarError(false);
        }}
      />

      <Snackbar
        {...errorSnackbarArgs()}
        open={snackbarError400BussinesCard}
        text={'Отсутствует телефон менеджера. Обратитесь к администратору.'}
        onClose={() => {
          setErrorOccurred(false);
          currError(null);
          setIsOpenSnackbarError400(false);
        }}
      />
      <Snackbar
        {...errorSnackbarArgs()}
        open={!!existingClientSnackbarType}
        text="Клиент с такой почтой уже есть в системе."
        onClose={() => {
          setErrorOccurred(false);
          currError(null);
          setErrorExistingClientSnackbarType(null);
        }}
      />

      <Snackbar
        {...interestSuccessSnackbarArgs()}
        open={isInterestSuccessSnackbarOpen}
        text={
          interestOperationType === InterestOperationType.CREATE
            ? 'Интерес создан в базе данных'
            : 'Изменения интереса сохранены'
        }
        onClose={() => setOpenInterestSuccessSnackbarOpen(false)}
      />

      <Snackbar
        {...interestSuccessSnackbarArgs()}
        open={isLelalEntitySnackbarOpen}
        text={
          legalEntityOperationType === InterestOperationType.CREATE
            ? 'Юридическое лицо создано'
            : 'Изменения юридического лица сохранены'
        }
        onClose={() => setOpenSuccessLelalEntitySnackbarOpen(false)}
      />
      <Snackbar
        {...successSnackbarArgs()}
        open={exportInterestSnackbarOpen}
        text="Выгрузка сформирована и направлена на вашу почту"
        onClose={() => setIsExportInterestSnackbarOpen(false)}
      />
      <Snackbar
        {...errorSnackbarArgs()}
        open={failExportInterestSnackbarOpen}
        text="Произошла ошибка! Попробуйте позже или свяжитесь с поддержкой"
        onClose={() => setIsFailExportInterestSnackbarOpen(false)}
      />
      {/*
        @TODO: прокинуть номер заявки при интеграции с беком и отмену взятия в работу  */}
      <Snackbar
        {...mortgageSnackbarArgs({
          applicationNumber: '',
          onClick: () => {},
        })}
        open={openGetToWorkSnackbarOpen}
        onClose={() => setOpenGetToWorkSnackbarOpen(false)}
      />
      <Can do={CrudAbility.READ} on={Abilities.HIDE_PRICES}>
        <Snackbar
          smallSize
          {...hidePriceSnackbarArgs()}
          open={openHidePriceSnackbar}
          text={<StyledSnackbarText width={200}>Цены скрыты</StyledSnackbarText>}
          onClose={() => setOpenHidePriceSnackbar(false)}
        />
        <Snackbar
          smallSize
          {...showPriceSnackbarArgs()}
          open={openShowPriceSnackbar}
          text={<StyledSnackbarText width={200}>Цены отображаются</StyledSnackbarText>}
          onClose={() => setOpenShowPriceSnackbar(false)}
        />
      </Can>
      <Snackbar
        smallSize
        {...userFreeSnackbarArgs()}
        open={openUserFreeSnackbar}
        text={<StyledSnackbarText width={200}>Вы доступны для звонков</StyledSnackbarText>}
        onClose={() => setOpenUserFreeSnackbar(false)}
      />
      <Snackbar
        smallSize
        {...userBusySnackbarArgs()}
        open={openUserBusySnackbar}
        text={<StyledSnackbarText width={200}>Вы недоступны для звонков</StyledSnackbarText>}
        onClose={() => setOpenUserBusySnackbar(false)}
      />
      <Snackbar
        smallSize
        {...micMutedSnackbarArgs()}
        open={openMicMutedSnackbar}
        text={<StyledSnackbarText width={180}>Микрофон отключён</StyledSnackbarText>}
        onClose={() => setOpenMicMutedSnackbar(false)}
      />
      <Snackbar
        smallSize
        {...micUnmutedSnackbarArgs()}
        open={openMicUnmutedSnackbar}
        text={<StyledSnackbarText width={180}>Микрофон включён</StyledSnackbarText>}
        onClose={() => setOpenMicUnmutedSnackbar(false)}
      />
      <PresentationSnackbars />
      <Snackbar
        {...copyClientSnackbarArgs()}
        text="Новый интерес создан через копирование дубля"
        open={copyClientSnackbarOpen}
        onClose={() => setIsCopyClientSnackbarOpen(false)}
      />

      <Snackbar
        {...duplicateTemplateSnackbarArgs()}
        text="Копия визитки создана"
        open={isOpenSuccessDuplicateTemplateSnackbar}
        onClose={() => setOpenSuccessDuplicateTemplateSnackbar(false)}
      />

      <Can do={CrudAbility.READ} on={Abilities.TELEPHONY}>
        <Snackbar
          {...callRedirectSuccessSnackbarArgs()}
          open={callRedirectSuccessSnackbar.open}
          text={<StyledSnackbarText py={2}>{callRedirectSuccessSnackbar.text}</StyledSnackbarText>}
          onClose={() => dismissCallRedirectSuccessSnackbarEvent()}
        />
        <Snackbar
          {...clientCallEndedSnackbarArgs()}
          open={clientCallEndedSnackbar}
          text="Звонок завершен клиентом"
          onClose={() => setClientCallEndedSnackbarEvent(false)}
          smallSize
        />
      </Can>

      <Snackbar
        {...interestErrorSnackbarArgs()}
        smallSize
        open={isOpenErrorRejectSnackbar}
        text={`Перевод в "Отказ" невозможен. Чтобы перевести интереса в статус "Отказ", закройте договор в CRM`}
        onClose={() => {
          setOpenErrorRejectSnackbar(false);
        }}
      />
      <NotificationContainer />
      <BirthdayTodayPlanContainer />

      <EventSnackbar />
    </>
  );
};
