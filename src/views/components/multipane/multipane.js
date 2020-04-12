const LAYOUT_HORIZONTAL = 'horizontal';
const LAYOUT_VERTICAL = 'vertical';

export default {
  name: 'multipane',

  props: {
    layout: {
      type: String,
      default: LAYOUT_VERTICAL
    }
  },

  data() {
    return {
      isResizing: false
    };
  },

  computed: {
    classnames() {
      return ['multipane', 'layout-' + this.layout.slice(0, 1), this.isResizing ? 'is-resizing' : ''];
    },
    cursor() {
      return this.isResizing ? (this.layout == LAYOUT_VERTICAL ? 'col-resize' : 'row-resize') : '';
    },
    userSelect() {
      return this.isResizing ? 'none' : '';
    }
  },

  methods: {
    onMouseDown({ target: resizer, pageX: initialPageX, pageY: initialPageY }) {
      if (resizer.className && resizer.className.match('multipane-resizer')) {
        if (resizer.parentElement !== this.$el) return;
        const { $el: container, layout } = this;

        const prevPanel = resizer.previousElementSibling;
        const nextPanel = resizer.nextElementSibling;
        const { offsetWidth: initialPaneWidth, offsetHeight: initialPaneHeight } = prevPanel;

        const usePercentage = !!(prevPanel.style.width + '').match('%');
        console.log('pane.style.width', prevPanel.style.width, 'usePercentage', usePercentage);

        const { addEventListener, removeEventListener } = window;

        const resize = (initialSize, offset = 0) => {
          if (layout == LAYOUT_VERTICAL) {
            const containerWidth = container.clientWidth;
            const paneWidth = initialSize + offset;

            prevPanel.style.width = usePercentage ? (paneWidth / containerWidth) * 100 + '%' : paneWidth + 'px';
            console.log('resizeW', initialSize, containerWidth, paneWidth, offset, prevPanel.style.width);
            return prevPanel.style.width;
          }

          if (layout == LAYOUT_HORIZONTAL) {
            const containerHeight = container.clientHeight;
            const paneHeight = initialSize + offset;

            console.log('resizeH', initialSize, containerHeight, paneHeight, offset, prevPanel.style.width);
            prevPanel.style.height = usePercentage ? (paneHeight / containerHeight) * 100 + '%' : paneHeight + 'px';
            return prevPanel.style.width;
          }
        };

        // This adds is-resizing class to container
        this.isResizing = true;

        // Resize once to get current computed size
        // let size = resize();
        const size = layout == LAYOUT_VERTICAL ? resize(initialPaneWidth) : resize(initialPaneHeight);

        // Trigger paneResizeStart event
        this.$emit('paneResizeStart', prevPanel, resizer, size);

        const onMouseMove = ({ pageX, pageY }) => {
          const size =
            layout == LAYOUT_VERTICAL ? resize(initialPaneWidth, pageX - initialPageX) : resize(initialPaneHeight, pageY - initialPageY);

          this.$emit('paneResize', prevPanel, resizer, size);
        };

        const onMouseUp = () => {
          // Run resize one more time to set computed width/height.
          // const size = layout == LAYOUT_VERTICAL ? resize(prevPanel.clientWidth) : resize(prevPanel.clientHeight);

          // This removes is-resizing class to container
          this.isResizing = false;

          removeEventListener('mousemove', onMouseMove);
          removeEventListener('mouseup', onMouseUp);

          this.$emit('paneResizeStop', prevPanel, resizer, size);
        };

        addEventListener('mousemove', onMouseMove);
        addEventListener('mouseup', onMouseUp);
      }
    }
  }
};
