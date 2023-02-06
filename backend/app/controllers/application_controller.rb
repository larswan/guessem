class ApplicationController < ActionController::API
    skip_before_action :verify_authenticity_token, raise: false
    # skip_before_action :your_method_name, raise: false

end
