// @ts-nocheck
import noop from 'lodash/noop';
import { computed, onMounted, ref, inject, onUnmounted, Ref } from 'vue';
import uniqueId from 'lodash/uniqueId';
import {
  SpatialNavigation,
  FocusableComponentLayout,
  FocusDetails,
  KeyPressDetails,
  Direction
} from './../SpatialNavigation';

export type EnterPressHandler<P = object> = (
  props: P,
  details: KeyPressDetails
) => void;

export type EnterReleaseHandler<P = object> = (props: P) => void;

export type ArrowPressHandler<P = object> = (
  direction: string,
  props: P,
  details: KeyPressDetails
) => boolean;

export type FocusHandler<P = object> = (
  layout: FocusableComponentLayout,
  props: P,
  details: FocusDetails
) => void;

export type BlurHandler<P = object> = (
  layout: FocusableComponentLayout,
  props: P,
  details: FocusDetails
) => void;

export interface UseFocusableConfig<P = object> {
  focusable?: boolean;
  saveLastFocusedChild?: boolean;
  trackChildren?: boolean;
  autoRestoreFocus?: boolean;
  forceFocus?: boolean;
  isFocusBoundary?: boolean;
  focusBoundaryDirections?: Direction[];
  focusKey?: string;
  preferredChildFocusKey: string | null;
  onEnterPress?: EnterPressHandler<P>;
  onEnterRelease?: EnterReleaseHandler<P>;
  onArrowPress?: ArrowPressHandler<P>;
  onFocus?: FocusHandler<P>;
  onBlur?: BlurHandler<P>;
  extraProps?: P;
}

export interface UseFocusableResult {
  el: Ref<HTMLElement>; // <any> since we don't know which HTML tag is passed here
  focusSelf: (focusDetails?: FocusDetails) => void;
  focused: Ref<boolean>;
  hasFocusedChild: Ref<boolean>;
  focusKey: Ref<boolean>;
}

const useVueFocusableHook = <P>(
  {
    focusable = true,
    saveLastFocusedChild = true,
    trackChildren = false,
    autoRestoreFocus = true,
    forceFocus = false,
    isFocusBoundary = false,
    focusBoundaryDirections,
    focusKey: propFocusKey,
    preferredChildFocusKey,
    onEnterPress = noop,
    onEnterRelease = noop,
    onArrowPress = () => true,
    onFocus = noop,
    onBlur = noop,
    extraProps
  }: UseFocusableConfig<P> = {}): UseFocusableResult => {
  const onEnterPressHandler = (details: KeyPressDetails) => {
    onEnterPress(extraProps, details);
  }

  const onEnterReleaseHandler = () => {
    onEnterRelease(extraProps);
  }

  const onArrowPressHandler = (direction: string, details: KeyPressDetails) => {
    onArrowPress(direction, extraProps, details);
  }

  const onFocusHandler = (layout: FocusableComponentLayout, details: FocusDetails) => {
    onFocus(layout, extraProps, details)
  }

  const onBlurHandler = (layout: FocusableComponentLayout, details: FocusDetails) => {
    onBlur(layout, extraProps, details);
  }

  const el = ref<HTMLElement>();

  const focused = ref(false);
  const hasFocusedChild = ref(false);

  const parentFocusKey = inject('parentFocusKey', 'SN:ROOT');

  /**
   * Either using the propFocusKey passed in, or generating a random one
   */
  const focusKey = computed(() => propFocusKey || uniqueId('sn:focusable-item-'));

  const focusSelf = (focusDetails: FocusDetails = {}) => {
    SpatialNavigation.setFocus(focusKey.value, focusDetails);
  }

  onMounted(() => {
    const node = el.value

    el.value?.setAttribute('data-focusable-item', focusKey.value);

    SpatialNavigation.addFocusable({
      focusKey: focusKey.value,
      node,
      parentFocusKey: parentFocusKey,
      preferredChildFocusKey,
      onEnterPress: onEnterPressHandler,
      onEnterRelease: onEnterReleaseHandler,
      onArrowPress: onArrowPressHandler,
      onFocus: onFocusHandler,
      onBlur: onBlurHandler,
      onUpdateFocus: (isFocused = false) => {
        focused.value = isFocused;
      },
      onUpdateHasFocusedChild: (isFocused = false) => {
        hasFocusedChild.value = isFocused;
      },
      saveLastFocusedChild,
      trackChildren,
      isFocusBoundary,
      focusBoundaryDirections,
      autoRestoreFocus,
      forceFocus,
      focusable
    });
  });

  onMounted(() => {
    const node = el.value;

    SpatialNavigation.updateFocusable(focusKey.value, {
      node,
      preferredChildFocusKey,
      focusable,
      isFocusBoundary,
      focusBoundaryDirections,
      onEnterPress: onEnterPressHandler,
      onEnterRelease: onEnterReleaseHandler,
      onArrowPress: onArrowPressHandler,
      onFocus: onFocusHandler,
      onBlur: onBlurHandler
    });
  });

  onUnmounted(() => {
    SpatialNavigation.removeFocusable({ focusKey: focusKey.value });
  })

  return {
    el,
    focusSelf,
    focused,
    hasFocusedChild,
    focusKey
  };
};

export default useVueFocusableHook;
