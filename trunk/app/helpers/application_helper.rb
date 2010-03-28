module ApplicationHelper
  # Optional parameters
  # 
  # theme [aero, grey, vista]
  # adapter [prototype, jquery, yui]
  # debug [boolean]
  
  def toolbawks_extjs_head(options = {})
    
    stylesheets = []
    javascripts = []
    
    stylesheets << 'ext-all' if options[:all]
    stylesheets << 'core' if !options[:all]
    
    # Theme
    # No Default
    stylesheets << 'ytheme-' + options[:theme] if ['aero', 'gray', 'vista'].include?(options[:theme])
    
    # Adapter
    # Default to prototype
    options[:adapter] = 'prototype' if !options[:adapter]
    javascripts << 'adapter/' + options[:adapter] + '/ext-' + options[:adapter] + '-adapter' if ['jquery', 'prototype', 'yui'].include?(options[:adapter])
    
    # Ext-all must be last
    javascripts << 'ext-all' + ((options[:debug] == true) ? '-debug' : '') if options[:all]
    javascripts << 'ext-core' + ((options[:debug] == true) ? '-debug' : '') if !options[:all]
    
    <<-EOL
    #{ stylesheets.map! { |css| stylesheet_link_tag( css, :plugin => 'toolbawks_extjs' ) } }
    #{ javascripts.map! { |js| javascript_include_tag( js, :plugin => 'toolbawks_extjs') } }
EOL
  end
end