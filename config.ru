use Rack::Static, :urls => ["/stylesheets", "/js"], :root => "public"

require './responsivatize'
run Sinatra::Application
