(function ($) {
  // register namespace
  $.extend(true, window, {
    "Slick": {
      "Editors": {
        "SelectCellEditor": SelectCellEditor
       }
    }
  });
  function SelectCellEditor(args) {
        var $select;
        var defaultValue;
        var scope = this;

        this.init = function() {

            if(args.column.options){
              opt_values = args.column.options.split(',');
            }else{
              opt_values ="yes,no".split(',');
            }
            option_str = ""
            opt_values.forEach( function(v) {
              option_str += "<OPTION value='"+v+"'>"+v+"</OPTION>";
            });
            $select = $("<SELECT tabIndex='0' class='editor-select'>"+ option_str +"</SELECT>");
            $select.appendTo(args.container);
            $select.focus();
        };

        this.destroy = function() {
            $select.remove();
        };

        this.focus = function() {
            $select.focus();
        };

        this.loadValue = function(item) {
            defaultValue = item[args.column.field];
            if( defaultValue ){
              $select.val(defaultValue);
            } //$select.val(defaultValue);
        };

        this.serializeValue = function() {
            if(args.column.options){
              return $select.val();
            }else{
              return ($select.val() == "yes");
            }
        };

        this.applyValue = function(item,state) {
            item[args.column.field] = state;
        };

        this.isValueChanged = function() {
            return ($select.val() != defaultValue);
        };

        this.validate = function() {
            return {
                valid: true,
                msg: null
            };
        };

        this.init();
    }
})(jQuery);    
